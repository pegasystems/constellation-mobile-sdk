import { Utils } from "../../../helpers/utils.js";
import { getComponentFromMap } from "../../../mappings/sdk-component-map.js";
import { ContainerBaseComponent } from "../container-base.component.js";

const TAG = "[SimpleTableSelectComponent]";

export class SimpleTableSelectComponent extends ContainerBaseComponent {
    props = {
        children: [],
    };

    label = "";
    renderMode = "";
    showLabel = true;
    viewName = "";
    parameters = {};
    dataRelationshipContext = "";
    propsToUse;
    showSimpleTableManual;
    isSearchable;
    filters;
    listViewProps;
    pageClass;

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTableSelect";
        this.utils = new Utils();
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.updateSelf();
    }

    updateSelf() {
        const theConfigProps = this.pConn.getConfigProps();
        this.label = theConfigProps.label;
        this.renderMode = theConfigProps.renderMode;
        this.showLabel = theConfigProps.showLabel;
        this.viewName = theConfigProps.viewName;
        this.parameters = theConfigProps.parameters;
        this.dataRelationshipContext = theConfigProps.dataRelationshipContext;

        this.propsToUse = { label: this.label, showLabel: this.showLabel, ...this.pConn.getInheritedProps() };

        if (this.propsToUse.showLabel === false) {
            this.propsToUse.label = "";
        }
        const { MULTI } = PCore.getConstants().LIST_SELECTION_MODE;
        const { selectionMode, selectionList } = this.pConn.getConfigProps();
        const isMultiSelectMode = selectionMode === MULTI;
        const isReadOnly = this.renderMode === "ReadOnly" || theConfigProps.readOnly || this.propsToUse.readOnly;
        this.showSimpleTableManual = isMultiSelectMode && isReadOnly;

        if (!this.showSimpleTableManual) {
            const pageReference = this.pConn.getPageReference();
            let referenceProp = isMultiSelectMode
                ? selectionList.substring(1)
                : pageReference.substring(pageReference.lastIndexOf(".") + 1);
            // Replace here to use the context name instead
            let contextPageReference = null;
            if (this.dataRelationshipContext != null && selectionMode === "single") {
                referenceProp = this.dataRelationshipContext;
                contextPageReference = pageReference.concat(".").concat(referenceProp);
            }
            const metadata = isMultiSelectMode
                ? this.pConn.getFieldMetadata(`${referenceProp}`)
                : this.pConn.getCurrentPageFieldMetadata(contextPageReference);

            const { datasource: { parameters: fieldParameters = {} } = {}, pageClass } = metadata;

            this.pageClass = pageClass;
            const compositeKeys = [];
            Object.values(fieldParameters).forEach((param) => {
                if (this.#isSelfReferencedProperty(param, referenceProp)) {
                    compositeKeys.push(param.substring(param.lastIndexOf(".") + 1));
                }
            });
            this.#processFilters(theConfigProps, compositeKeys);
        }
        this.#createChildComponent();
        this.#sendPropsUpdate();
    }

    #sendPropsUpdate() {
        this.props = {
            children: this.getChildrenProps(),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #createChildComponent() {
        let childComponentType;
        let propsToPass = [];
        if (this.showSimpleTableManual) {
            childComponentType = "SimpleTable";
        } else if (this.isSearchable) {
            childComponentType = "PromotedFilters";
            propsToPass = [this.viewName, this.filters, this.listViewProps, this.pageClass, this.parameters];
        } else {
            childComponentType = "ListView";
            propsToPass = [this.listViewProps];
        }
        const existingChild = this.childrenComponents[0];
        if (!existingChild || existingChild.type !== childComponentType) {
            this.destroyChildren();
            const childClass = getComponentFromMap(childComponentType);
            let childInstance;
            if (childClass.name === "UnsupportedComponent") {
                // passing explicit component type because pConn's type 'SimpleTableSelect'
                childInstance = new childClass(this.componentsManager, this.pConn, childComponentType);
            } else {
                childInstance = new childClass(this.componentsManager, this.pConn, ...propsToPass);
            }
            childInstance.init();
            this.childrenComponents = [childInstance];
        } else {
            existingChild.update(this.pConn, ...propsToPass);
        }
    }

    #isSelfReferencedProperty(param, referenceProp) {
        const [, parentPropName] = param.split('.');
        const referencePropParent = referenceProp?.split('.').pop();
        return parentPropName === referencePropParent;
    }

    #processFilters(theConfigProps, compositeKeys) {
        const defaultRowHeight = "2";

        const additionalTableConfig = {
            rowDensity: false,
            enableFreezeColumns: false,
            autoSizeColumns: false,
            resetColumnWidths: false,
            defaultFieldDef: {
                showMenu: false,
                noContextMenu: true,
                grouping: false,
            },
            itemKey: "$key",
            defaultRowHeight,
        };

        this.listViewProps = {
            ...theConfigProps,
            title: this.propsToUse.label,
            personalization: false,
            grouping: false,
            expandGroups: false,
            reorderFields: false,
            showHeaderIcons: false,
            editing: false,
            globalSearch: true,
            toggleFieldVisibility: false,
            basicMode: true,
            additionalTableConfig,
            compositeKeys,
            viewName: this.viewName,
            parameters: this.parameters,
        };

        this.filters = (this.pConn.getRawMetadata()?.config).promotedFilters ?? [];

        this.isSearchable = this.filters.length > 0;
    }
}
