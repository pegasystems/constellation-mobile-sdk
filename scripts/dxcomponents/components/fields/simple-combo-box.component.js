import { FieldBaseComponent } from "./field-base.component.js";
import { handleEvent } from "../../helpers/event-util.js";

const TAG = "SimpleComboBoxComponent";

export class SimpleComboBoxComponent extends FieldBaseComponent {
    #displayPropertyName;
    #targetPageProp;

    props = {
        value: "",
        label: "",
        visible: true,
        required: false,
        disabled: false,
        readOnly: false,
        helperText: "",
        placeholder: "",
        validateMessage: "",
        displayMode: "",
        options: [],
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleComboBox";
    }

    updateSelf() {
        this.updateBaseProps();

        const rawConfig = this.pConn.getComponentConfig();
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());

        const displayProperty = rawConfig?.datasource?.fields?.key;
        this.#displayPropertyName = PCore.getAnnotationUtils().getPropertyName(displayProperty);
        this.#targetPageProp = `.${PCore.getAnnotationUtils().getPropertyName(rawConfig?.targetPage)}`;

        // Current value is read from resolved targetPage object
        const targetPage = configProps.targetPage;
        this.props.value = targetPage?.[this.#displayPropertyName] ?? "";

        this.#resolveOptions(configProps);

        this.propName = this.pConn.getStateProps().value;
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #getOptionKey(item) {
        return item[this.#displayPropertyName] ?? item.pyLabel ?? "";
    }

    #resolveOptions(configProps) {
        const datasource = configProps.datasource;
        if (!datasource?.source || !Array.isArray(datasource.source)) {
            this.props.options = [];
            return;
        }

        this.props.options = datasource.source.map((item) => ({
            key: this.#getOptionKey(item),
            label: item.pyLabel ?? item[this.#displayPropertyName] ?? "",
        }));
    }

    fieldOnChange(value) {
        this.props.value = value;

        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        const datasource = configProps.datasource;

        // Find the selected record from datasource using the same key derivation as #resolveOptions
        let selectedPage = datasource?.source?.find((record) => this.#getOptionKey(record) === value);
        if (selectedPage) {
            selectedPage = JSON.parse(JSON.stringify(selectedPage));
        }

        // Copy the selected record (or cleared target page) to the target page via Redux
        this.pConn.setPageValue(
            selectedPage || this.#resetTargetPage(datasource?.source?.[0]),
            this.#targetPageProp,
            true
        );

        // Notify PCore of the field change
        const actionsApi = this.pConn.getActionsApi();
        handleEvent(actionsApi, "changeNblur", this.propName, `${value || ""}`);
    }

    #resetTargetPage(refPage) {
        if (!refPage) return {};
        const emptyRecord = {};
        Object.keys(refPage).forEach((recordKey) => {
            emptyRecord[recordKey] = "";
        });
        return emptyRecord;
    }
}
