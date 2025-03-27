import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';

const NO_HEADER_TEMPLATES = ['SubTabs', 'SimpleTable', 'Confirmation', 'DynamicTabs', 'DetailsSubTabs'];
const DETAILS_TEMPLATES = [
  'Details',
  'DetailsFields',
  'DetailsOneColumn',
  'DetailsSubTabs',
  'DetailsThreeColumn',
  'DetailsTwoColumn',
  'NarrowWideDetails',
  'WideNarrowDetails'
];
const SUPPORTED_FORM_TEMPLATES = ['DefaultForm'];

function isDetailsTemplate(template) {
  return DETAILS_TEMPLATES.includes(template);
}

/**
 * WARNING:  It is not expected that this file should be modified.  It is part of infrastructure code that works with
 * Redux and creation/update of Redux containers and PConnect.  Modifying this code could have undesireable results and
 * is totally at your own risk.
 */

/**
 *
 * @param pConnn - PConnect Object
 * @returns visibility expression result if exists, otherwise true
 */
function evaluateVisibility(pConnn) {
  let bVisibility = true;
  const sVisibility = pConnn.meta.config.visibility;
  if (sVisibility && sVisibility.length) {
    // e.g. "@E .EmbeddedData_SelectedTestName == 'Readonly' && .EmbeddedData_SelectedSubCategory == 'Mode'"
    const aVisibility = sVisibility.split('&&');
    // e.g. ["EmbeddedData_SelectedTestName": "Readonly", "EmbeddedData_SelectedSubCategory": "Mode"]
    const context = pConnn.getContextName();
    // Reading values from the Store to evaluate the visibility expressions
    const storeData = PCore.getStore().getState()?.data[context].caseInfo.content;

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
  }
  return bVisibility;
}

// interface ViewProps {
//   // If any, enter additional props that only exist on this component
//   template?: string;
//   label?: string;
//   showLabel: boolean;
//   title?: string;
//   visibility?: boolean;
// }

export class ViewComponent {
  pConn$;
  formGroup$;
  displayOnlyFA$;
  // @Input() updateToken$: number;

  jsComponentPConnectData = {};
  noHeaderTemplates = NO_HEADER_TEMPLATES;

  configProps$;
  inheritedProps$;
  arChildren$ = [];
  childrenComponents = [];
  templateName$;
  title$ = '';
  label$ = '';
  showLabel$ = false;
  visibility$ = true;
  compId;
  type;
  
  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.type = pConn$.meta.type
  }

  init() {
    // First thing in initialization is registering and subscribing to the JsComponentPConnect service
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    // save component to map so we can receive events from native 
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    Utils.destroyChildren(this);
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
    this.sendPropsUpdate();
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.checkAndUpdate();
    }
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    const props = {
      children: Utils.getChildrenComponentsIds(this.childrenComponents),
      visible: this.visibility$,  
      label: this.label$,
      showLabel: this.showLabel$
    };
    console.log("sending View props: ", props);
    this.componentsManager.onComponentPropsUpdate(this.compId, props);
  }

  // Callback passed when subscribing to store change
  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    // Should always check the bridge to see if the component should
    // update itself (re-render)
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    // ONLY call updateSelf when the component should update
    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  updateSelf() {
    if (this.jsComponentPConnect.getComponentID(this) === undefined) {
      return;
    }

    // debugger;

    // normalize this.pConn$ in case it contains a 'reference'
    this.pConn$ = ReferenceComponent.normalizePConn(this.pConn$);

    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.inheritedProps$ = this.pConn$.getInheritedProps();

    // NOTE: this.configProps$.visibility'] is used in view.component.ts such that
    //  the View will only be rendered when this.configProps$.visibility'] is false.
    //  It WILL render if true or undefined.

    this.templateName$ = this.configProps$.template || '';
    this.title$ = this.configProps$.title || '';
    this.label$ = this.configProps$.label || '';
    this.showLabel$ = this.configProps$.showLabel || isDetailsTemplate(this.templateName$) || this.showLabel$;
    // label & showLabel within inheritedProps takes precedence over configProps
    this.label$ = this.inheritedProps$.label || this.label$;
    this.showLabel$ = this.inheritedProps$.showLabel || this.showLabel$;

    const oldChildren = this.arChildren$
    // children may have a 'reference' so normalize the children array
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn$.getChildren());

    this.visibility$ = this.configProps$.visibility ?? this.visibility$;

    /**
     * In instances where there is context, like with "shippingAddress," the pageReference becomes "caseInfo.content.shippingAddress."
     * This leads to problems in the getProperty API, as it incorrectly assesses the visibility condition by looking in the wrong location
     * in the Store for the property values. Reference component should be able to handle such scenarios(as done in SDK-R) since it has the
     * expected pageReference values, the View component currently cannot handle this.
     * The resolution lies in transferring this responsibility to the Reference component, eliminating the need for this code when Reference
     * component is able to handle it.
     */
    if (!this.configProps$.visibility && this.pConn$.getPageReference().length > 'caseInfo.content'.length) {
      this.visibility$ = evaluateVisibility(this.pConn$);
    }

    // was:  this.arChildren$ = this.pConn$.getChildren() as Array<any>;

    // debug
    // let  kidList: string = "";
    // for (let i in this.arChildren$) {
    //   kidList = kidList.concat(this.arChildren$[i].getPConnect().getComponentName()).concat(",");
    // }
    // console.log("-->view update: " + this.jsComponentPConnect.getComponentID(this) + ", template: " + this.templateName$ + ", kids: " + kidList);

    if (SUPPORTED_FORM_TEMPLATES.includes(this.templateName$)) {
      if (this.childrenComponents[0] !== undefined) {
        this.childrenComponents[0].update(this.pConn$, this.arChildren$);
      } else {
        const defaultFormComponentClass = getComponentFromMap("DefaultForm");
        const defaultFormComponent = new defaultFormComponentClass(this.componentsManager, this.pConn$, this.arChildren$);
        defaultFormComponent.init();
        this.childrenComponents.push(defaultFormComponent);
      }
    } else {
      const reconciledComponents = this.componentsManager.reconcileChildren(this, oldChildren);
      this.childrenComponents = reconciledComponents.map((item) => item.component);
      this.componentsManager.initReconciledComponents(reconciledComponents);
    }

  
    this.sendPropsUpdate();
  }

  // JA - adapting additionalProps from Nebula/Constellation version which uses static methods
  //    on the component classes stored in PComponents (that  doesn't have)...
  additionalProps(state, getPConnect) {
    let propObj = {};

    // We already have the template name in this.templateName$
    if (this.templateName$ !== '') {
      let allFields = {};

      // These uses are adapted from Nebula/Constellation CaseSummary.additionalProps
      switch (this.templateName$) {
        case 'CaseSummary':
          allFields = getAllFields(getPConnect);
          // eslint-disable-next-line no-case-declarations
          const unresFields = {
            primaryFields: allFields[0],
            secondaryFields: allFields[1]
          };
          propObj = getPConnect.resolveConfigProps(unresFields);
          break;

        case 'Details':
          allFields = getAllFields(getPConnect);
          propObj = { fields: allFields[0] };
          break;
        default:
          break;
      }
    }

    return propObj;
  }

  getAllFields(pConnect) {
    const metadata = pConnect.getRawMetadata();
    let allFields = [];
    if (metadata.children && metadata.children.map) {
      allFields = metadata.children.map(fields => {
        const children = fields.children instanceof Array ? fields.children : [];
        return children.map(field => field.config);
      });
    }
    return allFields;
  }
}
