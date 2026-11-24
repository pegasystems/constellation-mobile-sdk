import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { JsComponentPConnectService } from "../commonMain/composeResources/files/scripts/dxcomponents/js-component-pconnect.js";
import { removeNode } from "../commonMain/composeResources/files/scripts/dxcomponents/pconnect-helpers.js";
// Match the engine's entry point for the component map's circular imports.
import "../commonMain/composeResources/files/scripts/dxcomponents/mappings/sdk-component-map.js";
import { SimpleTableSelectComponent } from "../commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/simple-table-select.component.js";

const CONTEXT = "app/primary_1/workarea_1";
const PAGE = "caseInfo.content";
const PARENT = "Question";
const VISIBLE_VIEW = "Question_Choice_A";
const HIDDEN_VIEW = "Question_Choice_B";
const ANSWER = `${PAGE}.Choice.Product`;

let tree;
let service;

beforeEach(() => {
    tree = {
        views: new Map([
            [PARENT, null],
            [VISIBLE_VIEW, PARENT],
            [HIDDEN_VIEW, PARENT],
        ]),
        fields: new Map([[ANSWER, VISIBLE_VIEW]]),
        removeFieldNode: mock.fn(),
        removeViewNode: mock.fn((context, page, name) => {
            const descendants = new Set([name]);
            for (const [view, parent] of tree.views) {
                if (descendants.has(parent)) descendants.add(view);
            }
            for (const view of descendants) tree.views.delete(view);
            for (const [field, view] of tree.fields) {
                if (descendants.has(view)) tree.fields.delete(field);
            }
        }),
    };
    globalThis.PCore = {
        setBehaviorOverride: mock.fn(),
        getContextTreeManager: () => tree,
    };
    service = new JsComponentPConnectService();
});

afterEach(() => {
    delete globalThis.PCore;
    mock.restoreAll();
});

function createView({ visible = false, viewName = HIDDEN_VIEW, config = {}, type = "View" } = {}) {
    const metadata = { type, name: viewName, config: { name: PARENT, ...config } };
    return {
        viewName,
        index: 2,
        options: {},
        visible,
        getRawMetadata: () => metadata,
        getContextName: () => CONTEXT,
        getPageReference: () => PAGE,
        isVisible() { return this.visible; },
        removeFormField: mock.fn(),
        removeNode: mock.fn(function () {
            if (!this.isVisible()) {
                tree.removeViewNode(CONTEXT, PAGE, metadata.config.name, this.index);
            }
        }),
        populateAdditionalProps: mock.fn(function () {
            this.removeNode();
        }),
    };
}

for (const hiddenName of [HIDDEN_VIEW, "Question_Choice_C", "Question_Choice_D"]) {
    test(`updating hidden ${hiddenName} preserves the parent's required field`, () => {
        const pConn = createView({ viewName: hiddenName });
        const originalRemoveNode = pConn.removeNode;

        service.populateAdditionalProps({ pConn }, {});

        assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
        assert.ok(tree.views.has(PARENT));
        assert.equal(tree.removeViewNode.mock.calls[0].arguments[2], hiddenName);
        assert.equal(originalRemoveNode.mock.callCount(), 0);
        assert.equal(pConn.removeNode, originalRemoveNode);
        assert.equal(pConn.getRawMetadata().config.name, PARENT);
    });
}

test("a visible view retains native property-update behavior", () => {
    const pConn = createView({ visible: true, viewName: VISIBLE_VIEW });
    const originalRemoveNode = pConn.removeNode;

    service.populateAdditionalProps({ pConn }, {});

    assert.equal(originalRemoveNode.mock.callCount(), 1);
    assert.equal(tree.removeViewNode.mock.callCount(), 0);
    assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
});

test("hiding a previously visible view removes its descendants but not sibling fields", () => {
    const pConn = createView({ visible: true });
    tree.fields.set(`${PAGE}.HiddenAnswer`, HIDDEN_VIEW);

    service.populateAdditionalProps({ pConn }, {});
    assert.ok(tree.fields.has(`${PAGE}.HiddenAnswer`));
    pConn.visible = false;
    service.populateAdditionalProps({ pConn }, {});

    assert.ok(!tree.fields.has(`${PAGE}.HiddenAnswer`));
    assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
});

test("Pega 26 hidden-view updates retain the visibility discriminator", () => {
    const pConn = createView({ config: { visibility: "@E .ShowVariant" } });
    pConn.options.visibility = false;
    pConn.populateAdditionalProps = function () {
        if (!this.isVisible()) this.removeNode();
    };

    service.populateAdditionalProps({ pConn }, {});

    assert.deepEqual(tree.removeViewNode.mock.calls[0].arguments, [
        CONTEXT, PAGE, HIDDEN_VIEW, 2, { visibility: false },
    ]);
    assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
});

for (const visible of [false, true]) {
    test(`tearing down a ${visible ? "visible" : "hidden"} view bypasses incorrect native removal`, () => {
        const pConn = createView({ visible });

        service.handleNodeRemoval({ pConn });

        assert.equal(pConn.removeFormField.mock.callCount(), 1);
        assert.equal(pConn.removeNode.mock.callCount(), 0);
        assert.equal(tree.removeViewNode.mock.calls[0].arguments[2], HIDDEN_VIEW);
        assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
    });
}

test("view removal uses the already-resolved page reference", () => {
    const pConn = createView({ config: { context: ".Address" } });
    pConn.getPageReference = () => `${PAGE}.Address`;

    removeNode({ pConn });

    assert.equal(tree.removeViewNode.mock.calls[0].arguments[1], `${PAGE}.Address`);
});

test("a failing update restores the original own method and propagates the error", () => {
    const pConn = createView();
    const originalDescriptor = Object.getOwnPropertyDescriptor(pConn, "removeNode");
    const failure = new Error("property update failed");
    pConn.populateAdditionalProps = () => { throw failure; };

    assert.throws(() => service.populateAdditionalProps({ pConn }, {}), error => error === failure);
    assert.deepEqual(Object.getOwnPropertyDescriptor(pConn, "removeNode"), originalDescriptor);
});

test("repeated updates restore an inherited method without leaving an instance override", () => {
    const pConn = createView();
    const originalRemoveNode = pConn.removeNode;
    delete pConn.removeNode;
    Object.setPrototypeOf(pConn, { removeNode: originalRemoveNode });

    service.populateAdditionalProps({ pConn }, {});
    service.populateAdditionalProps({ pConn }, {});

    assert.equal(pConn.removeNode, originalRemoveNode);
    assert.equal(Object.hasOwn(pConn, "removeNode"), false);
    assert.equal(tree.fields.get(ANSWER), VISIBLE_VIEW);
});

test("Pega 24 without context-tree removal keeps the original lifecycle", () => {
    const pConn = createView();
    delete pConn.removeNode;
    pConn.populateAdditionalProps = mock.fn();
    const props = {};

    service.populateAdditionalProps({ pConn }, props);
    service.handleNodeRemoval({ pConn });

    assert.deepEqual(pConn.populateAdditionalProps.mock.calls[0].arguments, [props]);
    assert.equal(pConn.removeFormField.mock.callCount(), 1);
    assert.equal(tree.removeViewNode.mock.callCount(), 0);
    assert.equal(Object.hasOwn(pConn, "removeNode"), false);
});

test("non-view property updates still use the native implementation", () => {
    const pConn = createView({ type: "TextInput" });

    service.populateAdditionalProps({ pConn }, {});

    assert.equal(pConn.removeNode.mock.callCount(), 1);
});

test("field teardown retains native cleanup and annotated property handling", () => {
    const pConn = createView({ type: "TextInput", config: { value: "@P .Choice.Product" } });
    pConn.removeNode = mock.fn();
    pConn.getPropertyName = () => "@P .Choice.Product";

    service.handleNodeRemoval({ pConn });

    assert.equal(pConn.removeNode.mock.callCount(), 1);
    assert.deepEqual(tree.removeFieldNode.mock.calls[0].arguments, [
        CONTEXT, PAGE, HIDDEN_VIEW, ".Choice.Product", 2,
    ]);
});

test("address removal retains the associated-view identity", () => {
    const pConn = createView({
        type: "Address",
        config: { value: "@ADDRESS .Address", associatedView: "@P AddressDetails" },
    });

    removeNode({ pConn });

    assert.deepEqual(tree.removeViewNode.mock.calls[0].arguments, [CONTEXT, PAGE, "AddressDetails", 2]);
});

test("non-view containers retain config id and relative context behavior", () => {
    const pConn = createView({
        type: "Group",
        config: { name: "", id: "GroupId", context: ".Details", referenceVisibility: "@E .ShowGroup" },
    });

    removeNode({ pConn });

    assert.deepEqual(tree.removeViewNode.mock.calls[0].arguments, [
        CONTEXT, `${PAGE}.Details`, "GroupId", 2, { visibility: "@E .ShowGroup" },
    ]);
});

test("selectable-table initialization populates validation metadata before rendering", () => {
    const events = [];
    const component = {
        jsComponentPConnect: {
            registerAndSubscribeComponent(owner, callback) {
                assert.equal(owner, component);
                assert.equal(callback, component.checkAndUpdate);
                events.push("subscribe");
                return { compID: "1" };
            },
        },
        componentsManager: { onComponentAdded: () => events.push("add") },
        checkAndUpdate: () => events.push("check"),
        updateSelf: () => assert.fail("init must not bypass validation registration"),
    };

    SimpleTableSelectComponent.prototype.init.call(component);

    assert.deepEqual(events, ["subscribe", "add", "check"]);
    assert.deepEqual(component.jsComponentPConnectData, { compID: "1" });
});
