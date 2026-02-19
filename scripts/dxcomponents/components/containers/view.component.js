import { ReferenceComponent } from "./reference.component.js";
import { ContainerBaseComponent } from "./container-base.component.js";

const TAG = "[ViewComponent]";

export class ViewComponent extends ContainerBaseComponent {
    READ_ONLY_DETAILS_TEMPLATES = [
        "Details",
        "DetailsOneColumn",
        "DetailsTwoColumn",
        "DetailsThreeColumn",
        "NarrowWideDetails",
        "WideNarrowDetails",
    ];

    DETAILS_TEMPLATES = [...this.READ_ONLY_DETAILS_TEMPLATES, "DetailsFields", "DetailsSubTabs"];

    SUPPORTED_FORM_TEMPLATES = ["DefaultForm", "OneColumn"];
    UNSUPPORTED_FORM_TEMPLATES = ["TwoColumn", "ThreeColumn", "WideNarrow"];

    SUPPORTED_TEMPLATES = [...this.SUPPORTED_FORM_TEMPLATES, "SimpleTable", "DataReference"];
    NO_HEADER_TEMPLATES = ['SimpleTable'];

    jsComponentPConnectData = {};
    props = {
        children: [],
        visible: true,
        label: "",
        showLabel: false,
    };

    init() {
        this.jsComponentPConnectData =
            this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
        this.componentsManager.onComponentAdded(this);
        this.#checkAndUpdate();
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.destroyChildren();
        this.props.children = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.#checkAndUpdate();
        }
    }

    onEvent(event) {
        this.childrenComponents.forEach((component) => {
            component.onEvent(event);
        });
    }

    #checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        if (this.jsComponentPConnect.getComponentID(this) === undefined) {
            return;
        }

        // normalize this.pConn in case it contains a 'reference'
        this.pConn = ReferenceComponent.normalizePConn(this.pConn);

        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        const inheritedProps = this.pConn.getInheritedProps();

        const template = this.#resolveTemplateType(configProps);
        const label = configProps.label ?? "";
        const showLabel = configProps.showLabel || this.DETAILS_TEMPLATES.includes(template);
        const isTemplateWithHeader = !this.NO_HEADER_TEMPLATES.includes(template);
        this.props.label = inheritedProps.label ?? label;
        this.props.showLabel = (inheritedProps.showLabel || showLabel) && isTemplateWithHeader;
        this.props.visible = configProps.visibility ?? this.props.visible;

        if (this.READ_ONLY_DETAILS_TEMPLATES.includes(template)) {
            this.pConn.setInheritedProp("displayMode", "DISPLAY_ONLY");
            this.pConn.setInheritedProp("readOnly", true);
        }

        /**
         * In instances where there is context, like with "shippingAddress," the pageReference becomes "caseInfo.content.shippingAddress."
         * This leads to problems in the getProperty API, as it incorrectly assesses the visibility condition by looking in the wrong location
         * in the Store for the property values. Reference component should be able to handle such scenarios(as done in SDK-R) since it has the
         * expected pageReference values, the View component currently cannot handle this.
         * The resolution lies in transferring this responsibility to the Reference component, eliminating the need for this code when Reference
         * component is able to handle it.
         */
        if (!configProps.visibility && this.pConn.getPageReference().length > "caseInfo.content".length) {
            this.props.visible = this.#evaluateVisibility(this.pConn, configProps.referenceContext);
        }

        if (this.SUPPORTED_TEMPLATES.includes(template)) {
            this.#includeTemplate(template);
        } else {
            if (template) console.warn(TAG, `${template} not supported. Rendering children components directly.`);
            this.reconcileChildren();
        }

        this.props.children = this.getChildrenComponentsIds();
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #includeTemplate(template) {
        if (this.childrenComponents[0] && this.childrenComponents[0].type !== template) {
            this.destroyChildren();
        }

        if (this.childrenComponents[0]) {
            this.childrenComponents[0].update(this.pConn);
        } else {
            this.childrenComponents[0] = this.componentsManager.create(template, [this.pConn]);
            this.childrenComponents[0].init();
        }
    }

    #evaluateVisibility(pConn, referenceContext) {
        const visibilityExpression = pConn.meta.config.visibility;
        if (!visibilityExpression || visibilityExpression.length === 0) return true;
        const contextName = pConn.getContextName();
        if (visibilityExpression.startsWith("@E ")) {
            return this.#evaluateExpressionVisibility(contextName, referenceContext, visibilityExpression);
        } else if(visibilityExpression.startsWith("@W ")) {
            return this.#evaluateWhenVisibility(contextName, visibilityExpression);
        } else {
            console.warn(TAG, `Unsupported visibility expression: ${visibilityExpression}. Defaulting to visible.`);
            return true;
        }
    }

    #evaluateExpressionVisibility(contextName, referenceContext, visibilityExpression) {
        let dataPage = this.#getDataPage(contextName, referenceContext);
        if (!dataPage) return false;

        const visibilityConditions = visibilityExpression.replace("@E ", "");
        return PCore.getExpressionEngine().evaluate(visibilityConditions, dataPage, {
            pConnect: {
                getPConnect: () => {
                    return this.pConn;
                },
            },
        });
    }

    #evaluateWhenVisibility(contextName, visibilityExpression) {
        let bVisibility = true;
        // e.g. "@E .EmbeddedData_SelectedTestName == 'Readonly' && .EmbeddedData_SelectedSubCategory == 'Mode'"
        const aVisibility = visibilityExpression.split('&&');
        // e.g. ["EmbeddedData_SelectedTestName": "Readonly", "EmbeddedData_SelectedSubCategory": "Mode"]
        // Reading values from the Store to evaluate the visibility expressions
        const storeData = PCore.getStore().getState()?.data[contextName].caseInfo.content;

        const initialVal = {};
        const oProperties = aVisibility.reduce((properties, property) => {
            const keyStartIndex = property.indexOf('.');
            const keyEndIndex = property.indexOf('=') - 1;
            const valueStartIndex = property.indexOf("'");
            const valueEndIndex = property.lastIndexOf("'") - 1;
            return {
                ...properties,
                [property.substr(keyStartIndex + 1, keyEndIndex - keyStartIndex - 1)]: property.substr(valueStartIndex + 1, valueEndIndex - valueStartIndex)
            };
        }, initialVal);

        const propertyKeys = Object.keys(oProperties);
        const propertyValues = Object.values(oProperties);

        for (let propertyIndex = 0; propertyIndex < propertyKeys.length; propertyIndex++) {
            if (storeData[propertyKeys[propertyIndex]] !== propertyValues[propertyIndex]) {
                bVisibility = false;
            }
        }

        return bVisibility;
    }

    #getDataPage(context, referenceContext) {
        let pageReferenceKeys = referenceContext.replace("caseInfo.content.", "").split(".");
        let page = PCore.getStore().getState()?.data[context].caseInfo.content;
        for (const key of pageReferenceKeys) {
            const arrayStartingBracketIndex = key.indexOf("[");
            const arrayEndingBracketIndex = key.indexOf("]");
            if (arrayStartingBracketIndex !== -1 && arrayEndingBracketIndex !== -1) {
                const keyName = key.substring(0, arrayStartingBracketIndex);
                const keyIndex = parseInt(key.substring(arrayStartingBracketIndex + 1, arrayEndingBracketIndex));
                if (page[keyName][keyIndex] !== undefined) {
                    page = page[keyName][keyIndex];
                } else {
                    return null;
                }
            } else {
                if (key in page) {
                    page = page[key];
                } else {
                    return null;
                }
            }
        }
        return page;
    }

    #resolveTemplateType(configProps) {
        const template = configProps.template ?? "";
        if (this.UNSUPPORTED_FORM_TEMPLATES.includes(template)) {
            console.warn(TAG, `${template} not supported. Falling back to DefaultForm.`);
            return "DefaultForm";
        } else {
            return template;
        }
    }
}
