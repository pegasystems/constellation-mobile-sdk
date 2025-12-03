import {Utils} from "../../../helpers/utils.js";
import {BaseComponent} from "../../base.component.js";
import {getContext} from "./template-utils.js";

const TAG = "[SimpleTableComponent]";

export class SimpleTableComponent extends BaseComponent {
    jsComponentPConnectData = {};
    childComponent;
    props = {
        child: undefined,
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTable";
        this.utils = new Utils();
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.checkAndUpdate();
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.childComponent?.destroy?.();
        this.childComponent = null
        this.#sendPropsUpdate();
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.checkAndUpdate();
        }
    }

    checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.props.label = configProps.label;

        if (configProps.value !== undefined) {
            this.props.value = configProps.value;
        }

        if (configProps.visibility != null) {
            this.props.visible = this.utils.getBooleanValue(configProps.visibility);
        }

        const {
            multiRecordDisplayAs,
            label: labelProp,
            propertyLabel,
            displayMode,
            fieldMetadata,
            hideLabel,
            parameters,
            isDataObject,
            type,
            ruleClass,
            authorContext,
            name
        } = configProps;
        const label = labelProp || propertyLabel;

        let {contextClass} = configProps;
        if (!contextClass) {
            let listName = this.pConn.getComponentConfig().referenceList;
            listName = PCore.getAnnotationUtils().getPropertyName(listName);
            contextClass = this.pConn.getFieldMetadata(listName)?.pageClass;
        }
        if (multiRecordDisplayAs === "fieldGroup") { // table, simpleTable
            const fieldGroupProps = {...configProps, contextClass};
            this.childComponent = this.componentsManager.upsert(this.childComponent, "FieldGroupTemplate", [
                this.pConn,
                fieldGroupProps,
            ]);
            this.#sendPropsUpdate();
        } else if (fieldMetadata && fieldMetadata.type === 'Page List' && fieldMetadata.dataRetrievalType === 'refer') {
            const {
                children: [{children: rawFields}],
                parameters: rawParams
            } = (this.pConn.getRawMetadata()).config;
            const isDisplayModeEnabled = displayMode === 'DISPLAY_ONLY';
            const propsToUse = {label, ...this.pConn.getInheritedProps()};
            if (isDisplayModeEnabled && hideLabel) {
                propsToUse.label = '';
            }

            const metaForListView = buildMetaForListView(
                fieldMetadata,
                rawFields,
                type,
                ruleClass,
                name,
                propsToUse.label,
                isDataObject,
                parameters // resolved params
            );

            const metaForPConnect = JSON.parse(JSON.stringify(metaForListView));
            // @ts-ignore - PCore.getMetadataUtils().getPropertyMetadata - An argument for 'currentClassID' was not provided.
            metaForPConnect.config.parameters = rawParams ?? PCore.getMetadataUtils().getPropertyMetadata(name)?.datasource?.parameters;

            const {referenceListStr: referenceList} = getContext(this.pConn);
            let requiredContextForQueryInDisplayMode = {};
            if (isDisplayModeEnabled) {
                requiredContextForQueryInDisplayMode = {
                    referenceList
                };
            }
            const options = {
                context: this.pConn.getContextName(),
                pageReference: this.pConn.getPageReference(),
                ...requiredContextForQueryInDisplayMode
            };

            const listViewPConn = PCore.createPConnect({meta: metaForPConnect, options}).getPConnect();

            const listViewProps = {
                ...metaForListView.config,
                displayMode,
                fieldName: authorContext
            };
            // if (multiRecordDisplayAs === "simpleTable") {
            //
            // }
            this.childComponent = this.componentsManager.upsert(this.childComponent, "ListView", [
                listViewPConn,
                listViewProps,
            ]);
            this.#sendPropsUpdate();
        } else {
            // console.warn(
            //     TAG,
            //     `Unsupported display mode: ${multiRecordDisplayAs}. ListView and SimpleTableManual are not supported yet.`
            // );
            this.childComponent = this.componentsManager.upsert(this.childComponent, "SimpleTableManual", [this.pConn]);
            this.#sendPropsUpdate();
        }
    }

    onEvent(event) {
        // TODO: remove optional call when other modes are implemented so that child component is always defined
        this.childComponent?.onEvent(event);
    }

    #sendPropsUpdate() {
        this.props = {
            child: this.childComponent?.compId ?? "-1",
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
