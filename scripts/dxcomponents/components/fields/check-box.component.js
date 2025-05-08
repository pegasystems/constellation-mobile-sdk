import { deleteInstruction, insertInstruction, updateNewInstructions } from '../../helpers/instructions-utils.js';
import { Utils } from '../../helpers/utils.js';
import { handleEvent } from '../../helpers/event-util.js';

// interface CheckboxProps extends Omit<PConnFieldProps, 'value'> {
//   // If any, enter additional props that only exist on Checkbox here
//   // Everything from PConnFieldProps except value and change type of value to boolean
//   value: boolean;
//   caption?: string;
//   trueLabel?: string;
//   falseLabel?: string;
//   selectionMode?: string;
//   datasource?: any;
//   selectionKey?: string;
//   selectionList?: any;
//   primaryField: string;
//   readonlyContextList: any;
//   referenceList: string;
// }

export class CheckBoxComponent {
  pConn$;

  // Used with JsComponentPConnect
  jsComponentPConnectData = {};
  configProps$;

  label$ = '';
  value$ = '';
  caption$ = '';
  testId = '';
  showLabel$ = false;
  bRequired$ = false;
  bReadonly$ = false;
  bDisabled$ = false;
  bVisible$ = true;
  displayMode$ = '';
  controlName$;
  bHasForm$ = true;
  componentReference = '';
  helperText;
  //for readOnly
  trueLabel$;
  falseLabel$;
  // for mode multi
  selectionMode;
  datasource;
  selectionKey;
  selectionList;
  primaryField;
  selectedvalues;
  referenceList;
  listOfCheckboxes = [];

  actionsApi;
  propName;
  compId;
  type;
  props;

  // fieldControl = new FormControl('', null);

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.utils = new Utils();
    this.controlName$ = this.jsComponentPConnect.getComponentID(this);
    this.type = pConn$.meta.type
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();

    if (this.selectionMode === 'multi' && this.referenceList?.length > 0) {
      this.pConn$.setReferenceList(this.selectionList);
      updateNewInstructions(this.pConn$, this.selectionList);
    }
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for checkbox component - id:  ", this.jsComponentPConnectData.compID);
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.checkAndUpdate();
    }
  }

  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);
    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  updateSelf() {
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.testId = this.configProps$.testId;
    this.displayMode$ = this.configProps$.displayMode || '';
    this.label$ = this.configProps$.label || '';
    if (this.label$ != '') {
      this.showLabel$ = true;
    }

    this.actionsApi = this.pConn$.getActionsApi();
    this.propName = this.pConn$.getStateProps().value;

    // multi case
    this.selectionMode = this.configProps$.selectionMode;
    if (this.selectionMode === 'multi') {
      console.log("Selection mode 'multi' is unsupported.");
      return;
      //TODO: uncomment once selectionMode multi is supported
      // this.referenceList = this.configProps$.referenceList;
      // this.selectionList = this.configProps$.selectionList;
      // this.selectedvalues = this.configProps$.readonlyContextList;
      // this.primaryField = this.configProps$.primaryField;

      // this.datasource = this.configProps$.datasource;
      // this.selectionKey = this.configProps$.selectionKey;
      // const listSourceItems = this.datasource?.source ?? [];
      // const dataField = this.selectionKey?.split?.('.')[1] ?? '';
      // const listToDisplay = [];
      // listSourceItems.forEach(element => {
      //   element.selected = this.selectedvalues?.some?.(data => data[dataField] === element.key);
      //   listToDisplay.push(element);
      // });
      // this.listOfCheckboxes = listToDisplay;
    } else {
      if (this.configProps$.value != undefined) {
        this.value$ = this.configProps$.value;
      }

      this.caption$ = this.configProps$.caption || '';
      this.helperText = this.configProps$.helperText || '';
      this.trueLabel$ = this.configProps$.trueLabel || 'Yes';
      this.falseLabel$ = this.configProps$.falseLabel || 'No';

      if (this.configProps$.required != null) {
        this.bRequired$ = this.utils.getBooleanValue(this.configProps$.required);
      }

      if (this.configProps$.visibility != null) {
        this.bVisible$ = this.utils.getBooleanValue(this.configProps$.visibility);
      }

      if (this.configProps$.disabled != undefined) {
        this.bDisabled$ = this.utils.getBooleanValue(this.configProps$.disabled);
      }

      if (this.configProps$.readOnly != null) {
        this.bReadonly$ = this.utils.getBooleanValue(this.configProps$.readOnly);
      }

      if (this.bDisabled$ || this.bReadonly$) {
        // this.fieldControl.disable();
      } else {
        // this.fieldControl.enable();
      }

      this.componentReference = this.pConn$.getStateProps().value;
    }

    this.props = {
      value: this.value$,
      label: this.label$,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: this.helperText,
      caption: this.caption$,
      validateMessage: this.jsComponentPConnectData.validateMessage || '',
      displayMode: this.displayMode$
    }
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.value$ = value
    const checked = this.value$ === 'true' || this.value$ === true;
    handleEvent(this.actionsApi, 'changeNblur', this.propName, checked);
  }

  fieldOnBlur(value) {
    this.value$ = value || this.value$
    if (this.selectionMode === 'multi') {
      this.pConn$.getValidationApi().validate(this.selectedvalues, this.selectionList);
    } else {
      this.pConn$.getValidationApi().validate(this.value$ === 'true');
    }
    Utils.clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
  }

  handleChangeMultiMode(event, element) {
    if (!element.selected) {
      insertInstruction(this.pConn$, this.selectionList, this.selectionKey, this.primaryField, {
        id: element.key,
        primary: element.text ?? element.value
      });
    } else {
      deleteInstruction(this.pConn$, this.selectionList, this.selectionKey, {
        id: element.key,
        primary: element.text ?? element.value
      });
    }
    this.pConn$.clearErrorMessages({
      property: this.selectionList,
      category: '',
      context: ''
    });
  }

  getErrorMessage() {
    let errMessage = '';

    // look for validation messages for json, pre-defined or just an error pushed from workitem (400)
    // if (this.fieldControl.hasError('message')) {
    //   errMessage = this.jsComponentPConnectData.validateMessage ?? '';
    //   return errMessage;
    // }
    // if (this.fieldControl.hasError('required')) {
    //   errMessage = 'You must enter a value';
    // } else if (this.fieldControl.errors) {
    //   errMessage = this.fieldControl.errors.toString();
    // }

    return errMessage;
  }
}
