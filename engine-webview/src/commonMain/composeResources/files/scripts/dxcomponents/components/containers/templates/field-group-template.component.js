import { deepEquals, Utils } from "../../../helpers/utils.js";
import { ContainerBaseComponent } from "../container-base.component.js";
import { evaluateAllowRowAction, getReferenceList } from "./template-utils.js";

export class FieldGroupTemplateComponent extends ContainerBaseComponent {
    setTimeoutId;
    items = [];
    configProps;

    props = {
        children: [],
        items: [],
        label: "",
        showLabel: "",
        allowAddItems: true,
        addButtonLabel: ""
    };

    inheritedProps$;
    showLabel = true;
    label;
    contextClass;
    referenceList;
    referenceListLength;
    heading;
    fieldHeader;

    readonlyMode;
    allowedActions = {
        add: true,
        edit: true,
        delete: true,
    };

    //

    constructor(componentsManager, pConn, configProps) {
        super(componentsManager, pConn);
        this.type = "FieldGroupTemplate";
        this.configProps = configProps;
        this.utils = new Utils();
    }

    init() {
        this.componentsManager.onComponentAdded(this);
        this.updateSelf();
        if (this.referenceList?.length === 0 && (this.allowedActions.add || this.allowedActions.edit)) {
            this.setTimeoutId = setTimeout(() => {
                this.setTimeoutId = undefined;
                if (!this.alive) {
                    return;
                }
                this.addFieldGroupItem();
            });
        }
    }

    destroy() {
        if (this.setTimeoutId) {
            clearTimeout(this.setTimeoutId);
            this.setTimeoutId = undefined;
        }
        this.items = [];
        this.props.items = [];
        super.destroy();
    }

    update(pConn, configProps) {
        if (configProps) {
            if (configProps !== this.configProps) {
                this.configProps = configProps;
                if (pConn) {
                    this.pConn = pConn;
                }
                this.updateSelf();
            }
        }
    }

    updateSelf() {
        this.updateActionsAndMode();
        this.inheritedProps$ = this.pConn.getInheritedProps();
        const label = this.configProps.label;
        const showLabel = this.configProps.showLabel;
        // label & showLabel within inheritedProps takes precedence over configProps
        this.label = this.inheritedProps$.label !== undefined ? this.inheritedProps$.label : label;
        this.showLabel = this.inheritedProps$.showLabel !== undefined ? this.inheritedProps$.showLabel : showLabel;
        this.contextClass = this.configProps.contextClass;
        const lookForChildInConfig = this.configProps.lookForChildInConfig;
        this.heading = this.configProps.heading ?? "Row";
        this.fieldHeader = this.configProps.fieldHeader;
        const resolvedList = getReferenceList(this.pConn);
        this.pConn.setReferenceList(resolvedList);
        const newReferenceList = this.configProps.referenceList ?? [];
        if (
            this.referenceList === undefined ||
            !deepEquals(this.referenceList, newReferenceList)
        ) {
            this.referenceList = newReferenceList;
            const { children, items } = this.#syncChildrenAndItems(lookForChildInConfig);
            this.childrenComponents = children;
            this.items = items;
        }
        this.sendPropsUpdate();
    }

    #syncChildrenAndItems(lookForChildInConfig) {
        const oldChildrenComponents = this.childrenComponents;
        const { allowRowDelete, allowRowEdit } = this.pConn.getComponentConfig();
        const children = [];
        const items = [];

        this.referenceList?.forEach((item, index) => {
            const newPConn = this.buildItemPConnect(
                this.pConn,
                index,
                lookForChildInConfig,
                evaluateAllowRowAction(allowRowEdit, item)
            ).getPConnect();
            const newComponent = this.reuseOrCreateChild(oldChildrenComponents[index], newPConn);
            children.push(newComponent);
            items.push(this.#buildItem(item, index, newComponent.compId, allowRowDelete));
        });

        oldChildrenComponents.slice(this.referenceList.length).forEach((component) => {
            component.destroy?.();
        });
        this.referenceListLength = this.referenceList.length;

        return { children, items };
    }

    #buildItem(item, index, componentId, allowRowDelete) {
        return {
            id: index,
            heading:
                this.fieldHeader === "propertyRef"
                    ? this.getDynamicHeader(item, index)
                    : this.getStaticHeader(this.heading, index),
            componentId,
            allowDelete: this.allowedActions.delete && evaluateAllowRowAction(allowRowDelete, item),
        };
    }

    updateActionsAndMode() {
        const { allowActions, allowTableEdit, renderMode, displayMode } = this.configProps;
        this.readonlyMode = renderMode === "ReadOnly" || displayMode === "DISPLAY_ONLY";
        if (this.readonlyMode) {
            this.pConn.setInheritedProp("displayMode", "DISPLAY_ONLY");
            this.allowedActions.add = false;
            this.allowedActions.edit = false;
            this.allowedActions.delete = false;
            return;
        }
        if (allowActions && Object.keys(allowActions).length > 0) {
            this.allowedActions.add = allowActions.allowAdd ?? allowTableEdit ?? true;
            this.allowedActions.edit = allowActions.allowEdit ?? true;
            this.allowedActions.delete = allowActions.allowDelete ?? allowTableEdit ?? true;
        } else {
            this.allowedActions.add = allowTableEdit ?? true;
            this.allowedActions.delete = allowTableEdit ?? true;
        }
    }

    onEvent(event) {
        if (this.readonlyMode) {
            return; // no-op
        }

        if (event.type === "FieldGroupTemplateEvent") {
            switch (event.eventData?.type) {
                case "addItem":
                    this.addFieldGroupItem();
                    break;
                case "deleteItem":
                    this.deleteFieldGroupItem(event.eventData?.itemId);
                    break;
                default:
                    console.warn("FieldGroupTemplateComponent", "Unexpected event: ", event.eventData?.type);
            }
            return;
        }
        super.onEvent(event);
    }

    sendPropsUpdate() {
        this.props = {
            children: this.getChildrenProps(),
            items: this.items,
            label: this.label,
            showLabel: this.showLabel,
            allowAddItems: this.allowedActions.add,
            addButtonLabel: this.getAddButtonLabel(),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    getStaticHeader = (heading, index) => {
        return `${heading} ${index + 1}`;
    };

    getDynamicHeader = (item, index) => {
        if (this.fieldHeader === "propertyRef" && this.heading && item[this.heading.substring(1)]) {
            return item[this.heading.substring(1)];
        }
        return `Row ${index + 1}`;
    };

    getAddButtonLabel() {
        const { targetClassLabel } = this.configProps;
        return targetClassLabel ? `+ Add ${targetClassLabel}` : "+ Add";
    }

    addFieldGroupItem() {
        this.pConn.getListActions().insert({ classID: this.contextClass }, this.referenceList.length);
    }

    deleteFieldGroupItem(index) {
        if (index) {
            this.pConn.getListActions().deleteEntry(parseInt(index));
        } else {
            console.error("FieldGroupTemplateComponent", "Cannot delete item - index not provided.");
        }
    }

    buildItemPConnect(pConn, index, viewConfigPath, allowEdit) {
        const context = pConn.getContextName();
        const referenceList = getReferenceList(pConn);

        const isDatapage = referenceList.startsWith("D_");
        const pageReference = isDatapage
            ? `${referenceList}[${index}]`
            : `${pConn.getPageReference()}${referenceList}[${index}]`;
        const meta = viewConfigPath
            ? pConn.getRawMetadata().children[0].children[0]
            : pConn.getRawMetadata().children[0];
        const config = {
            meta,
            options: {
                context,
                pageReference,
                referenceList,
                hasForm: true,
            },
        };

        const pConnect = PCore.createPConnect(config);
        if (!allowEdit || !this.allowedActions.edit) {
            pConnect.getPConnect()?.setInheritedProp("displayMode", "DISPLAY_ONLY");
        }

        return pConnect;
    }
}
