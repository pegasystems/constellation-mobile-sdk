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
        const showLabel = configProps.showLabel || this.DETAILS_TEMPLATES.includes(template) || this.props.showLabel;

        this.props.label = inheritedProps.label ?? label;
        this.props.showLabel = inheritedProps.showLabel ?? showLabel;
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

        this.childrenComponents[0] = this.componentsManager.upsert(this.childrenComponents[0], template, [this.pConn]);
    }

    #evaluateVisibility(pConn, referenceContext) {
        const visibilityExpression = pConn.meta.config.visibility;
        if (!visibilityExpression || visibilityExpression.length === 0) return true;

        let dataPage = this.#getDataPage(pConn.getContextName(), referenceContext);
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
