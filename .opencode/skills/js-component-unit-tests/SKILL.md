---
name: js-component-unit-tests
description: "Write and update unit tests for JavaScript components in the scripts/ bridge layer. Use when creating test files, mocking pConn or PCore, testing component lifecycle (init, update, destroy), or verifying props sent through the bridge."
---

## Mock Setup

Every test file must mock `pConn`, `componentsManager`, and `jsComponentPConnect`. Use this structure:

```js
function createMockPConn(overrides = {}) {
    return {
        meta: { type: "TextInput" },
        getConfigProps: () => ({}),
        resolveConfigProps: (props) => props,
        getStateProps: () => ({ value: ".TextInput" }),
        getActionsApi: () => ({
            updateFieldValue: jest.fn(),
            triggerFieldChange: jest.fn(),
        }),
        clearErrorMessages: jest.fn(),
        ...overrides,
    };
}

function createMockComponentsManager() {
    const jsComponentPConnect = {
        registerAndSubscribeComponent: jest.fn(() => ({
            compID: "1",
            unsubscribeFn: jest.fn(),
            validateMessage: "",
        })),
        shouldComponentUpdate: jest.fn(() => true),
    };
    return {
        jsComponentPConnect,
        getNextComponentId: jest.fn(() => "1"),
        onComponentAdded: jest.fn(),
        onComponentRemoved: jest.fn(),
        onComponentPropsUpdate: jest.fn(),
    };
}
```

Mock `PCore` as a global only when the component under test calls it directly:

```js
global.PCore = {
    getStore: () => ({ getState: () => ({}), subscribe: jest.fn() }),
};
```

## Methods to Test

Test each lifecycle method on the component:

1. **`init()`** — verify it calls `registerAndSubscribeComponent`, `onComponentAdded`, and triggers `checkAndUpdate`
2. **`update(pConn)`** — pass a new pConn and verify `checkAndUpdate` fires; pass the same pConn and verify it does not
3. **`updateSelf()`** — verify resolved config props are mapped to `this.props` and `onComponentPropsUpdate` is called
4. **`fieldOnChange(value)`** — verify `this.props.value` is updated to the new value
5. **`fieldOnBlur(value)`** — verify it calls `handleEvent` with `"changeNblur"` when value differs from submitted value; verify `clearErrorMessages` when no validation errors
6. **`onEvent(event)`** — test `FieldChange` and `FieldChangeWithFocus` event types; verify `readOnly` guard returns early
7. **`destroy()`** — verify `unsubscribeFn` is called and `onComponentRemoved` fires

## Props Verification

Include one test that exercises the full flow (`init` → `checkAndUpdate` → `updateSelf`) and asserts the complete `props` object passed to `onComponentPropsUpdate`. Compare against expected shape:

```js
expect(manager.onComponentPropsUpdate).toHaveBeenCalledWith(
    expect.objectContaining({
        props: expect.objectContaining({
            value: "test",
            label: "Name",
            visible: true,
            required: false,
        }),
    })
);
```

## Test File Placement

Place test files alongside their component with a `.test.js` suffix:
- Field components: `scripts/dxcomponents/components/fields/<name>.component.test.js`
- Container components: `scripts/dxcomponents/components/containers/<name>.component.test.js`
- Widget components: `scripts/dxcomponents/components/widgets/<name>.component.test.js`

## Reference Files

- Base component: `scripts/dxcomponents/components/base.component.js`
- Field base with full lifecycle: `scripts/dxcomponents/components/fields/field-base.component.js`
- Event handling: `scripts/dxcomponents/helpers/event-util.js` (`handleEvent` dispatches `change`, `blur`, `changeNblur`)
- Components manager: `scripts/dxcomponents/components-manager.js`
