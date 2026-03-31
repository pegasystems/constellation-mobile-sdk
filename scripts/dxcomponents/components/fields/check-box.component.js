import { handleEvent } from "../../helpers/event-util.js";
import { FieldBaseComponent } from "./field-base.component.js";
import { deleteInstruction, insertInstruction, updateNewInstructions } from '../../helpers/instructions-utils.js';

const TAG = "[CheckBoxComponent]";
const MULTI_MODE = "multi";

export class CheckBoxComponent extends FieldBaseComponent {
    selectionMode;
    datasource;
    selectionKey;
    selectionList;
    primaryField;
    selectedValues;
    referenceList;
    checkboxGroupItems = [];

    init() {
        super.init();
        if (this.selectionMode === MULTI_MODE) {
            this.#initMultiMode();
        }
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            if (this.selectionMode === MULTI_MODE) {
                this.#initMultiMode();
            }
            this.checkAndUpdate();
        }
    }

    updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.updateBaseProps();

        this.selectionMode = configProps.selectionMode;
        this.props.selectionMode = this.selectionMode;
        if (this.selectionMode === MULTI_MODE) {
            this.referenceList = configProps.referenceList;
            this.selectionList = configProps.selectionList;
            this.selectedValues = configProps.readonlyContextList;
            this.primaryField = configProps.primaryField;
            this.props.readOnly = configProps.renderMode === 'ReadOnly' || configProps.displayMode === 'DISPLAY_ONLY' || configProps.readOnly;

            this.datasource = configProps.datasource;
            this.selectionKey = configProps.selectionKey;
            this.checkboxGroupItems = this.datasource?.source || [];
            const dataField = this.selectionKey?.split?.('.')[1] ?? '';
            this.checkboxGroupItems.forEach(element => {
                element.selected = this.selectedValues?.some?.(data => data[dataField] === element.key);
            });
            this.props.items = this.checkboxGroupItems;
        } else {
            this.props.hideLabel = configProps.hideLabel ?? false;
            this.props.caption = configProps.caption ?? "";
            this.props.trueLabel = configProps.trueLabel ?? "Yes";
            this.props.falseLabel = configProps.falseLabel ?? "No";
            this.propName = this.pConn.getStateProps().value;
        }
        this.componentsManager.onComponentPropsUpdate(this);
    }

    fieldOnChange(value, event) {
        this.props.value = value;
        handleEvent(this.pConn.getActionsApi(), "changeNblur", this.propName, this.#isChecked());
    }

    fieldOnBlur(value, event) {
        this.props.value = value ?? this.props.value;
        if (this.selectionMode === MULTI_MODE) {
          this.pConn.getValidationApi().validate(this.selectedValues, this.selectionList);
        } else {
          this.pConn.getValidationApi().validate(this.#isChecked());
        }
        this.clearErrorMessagesIfNoErrors(this.pConn, this.propName, this.jsComponentPConnectData.validateMessage);
    }

    onEvent(event) {
        super.onEvent(event)
        if (event.type === "ClickItem") {
            const clickedItemIndex = Number(event.componentData.clickedItemIndex);
            const isSelected = event.componentData.isSelected === "true";
            const element = this.checkboxGroupItems[clickedItemIndex];
            element.selected = isSelected;
            this.#handleChangeMultiMode(element);
        }
    }

    #initMultiMode() {
        if (this.referenceList?.length > 0 && !this.props.readOnly) {
            this.pConn.setReferenceList(this.selectionList);
            updateNewInstructions(this.pConn, this.selectionList);
        }
    }

    #handleChangeMultiMode(element) {
        if (element.selected) {
            insertInstruction(this.pConn, this.selectionList, this.selectionKey, this.primaryField, {
                id: element.key,
                primary: element.text ?? element.value
            });
        } else {
            deleteInstruction(this.pConn, this.selectionList, this.selectionKey, {
                id: element.key,
                primary: element.text ?? element.value
            });
        }
        this.pConn.clearErrorMessages({
            property: this.selectionList,
            category: '',
            context: ''
        });
    }

    #isChecked() {
        return this.props.value === "true" || this.props.value === true;
    }
}
