import { DetailsTemplateBase } from "./details-template-base.js";

const TAG = "DetailsComponent";

export class DetailsComponent extends DetailsTemplateBase {
    highlightedFields = [];
    showHighlightedFields = false;

    props = {
        highlightedFields: [],
        showHighlightedFields: false,
        children: [],
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "Details";
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.checkAndUpdate();
        }
    }

    checkAndUpdate() {
        const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

        if (bUpdateSelf || this.hasRawMetadataChanged()) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const rawMetaData = this.pConn.resolveConfigProps(this.pConn.getRawMetadata()?.config);
        this.showHighlightedFields = rawMetaData?.showHighlightedData;

        if (this.showHighlightedFields) {
            const highlightedData = rawMetaData?.highlightedData;
            this.highlightedFields = highlightedData.map((field) => {
                field.config.displayMode = "STACKED_LARGE_VAL";

                if (field.config.value === "@P .pyStatusWork") {
                    field.type = "TextInput";
                    field.config.displayAsStatus = true;
                }

                return field;
            });
        }

        const kids = this.pConn.getChildren();
        const fieldPConns = [];
        for (const kid of kids) {
            const pKid = kid.getPConnect();
            const fields = pKid.getChildren();
            fields?.forEach((field) => {
                const thePConn = field.getPConnect();
                const theCompType = thePConn.getComponentName().toLowerCase();
                if (theCompType === "reference" || theCompType === "group") {
                    const configProps = thePConn.getConfigProps();
                    configProps.readOnly = true;
                    configProps.displayMode = "DISPLAY_ONLY";
                    const propToUse = { ...thePConn.getInheritedProps() };
                    configProps.label = propToUse?.label;
                    const options = {
                        context: thePConn.getContextName(),
                        pageReference: thePConn.getPageReference(),
                        referenceList: thePConn.getReferenceList(),
                    };
                    const viewContConfig = {
                        meta: {
                            ...thePConn.getMetadata(),
                            type: theCompType,
                            config: configProps,
                        },
                        options,
                    };
                    const theViewCont = PCore.createPConnect(viewContConfig);
                    fieldPConns.push(theViewCont);
                } else {
                    fieldPConns.push(field);
                }
            });
        }
        this.reconcileChildren(fieldPConns);

        this.#sendPropsUpdate();
    }

    #sendPropsUpdate() {
        this.props = {
            highlightedFields: this.highlightedFields.map((field) => ({
                type: field.type,
                config: field.config
            })),
            showHighlightedFields: this.showHighlightedFields,
            children: this.getChildrenComponentsIds(),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
