import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import { BaseComponent } from '../base.component.js';

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
const SUPPORTED_FORM_TEMPLATES = ['DefaultForm', 'SimpleTable'];

function isDetailsTemplate(template) {
  return DETAILS_TEMPLATES.includes(template);
}

/**
 * WARNING:  It is not expected that this file should be modified.  It is part of infrastructure code that works with
 * Redux and creation/update of Redux containers and PConnect.  Modifying this code could have undesireable results and
 * is totally at your own risk.
 */

export class ViewComponent extends BaseComponent {

  jsComponentPConnectData = {};
  configProps$;
  inheritedProps$;
  arChildren$ = [];
  childrenComponents = [];
  templateName$;
  title$ = '';
  label$ = '';
  showLabel$ = false;
  visibility$ = true;
  props;

  init() {
    // First thing in initialization is registering and subscribing to the JsComponentPConnect service
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    // save component to map so we can receive events from native
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    Utils.destroyChildren(this);
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.checkAndUpdate();
    }
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {
      component.onEvent(event);
    })
  }

  sendPropsUpdate() {
    this.props = {
      children: Utils.getChildrenComponentsIds(this.childrenComponents),
      visible: this.visibility$,
      label: this.label$,
      showLabel: this.showLabel$
    };
    this.componentsManager.onComponentPropsUpdate(this);
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

    // normalize this.pConn in case it contains a 'reference'
    this.pConn = ReferenceComponent.normalizePConn(this.pConn);

    this.configProps$ = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.inheritedProps$ = this.pConn.getInheritedProps();

    // NOTE: this.configProps$.visibility'] is used in view.component.ts such that
    //  the View will only be rendered when this.configProps$.visibility'] is false.
    //  It WILL render if true or undefined.

    this.templateName$ = this.configProps$.template || '';
    this.title$ = this.configProps$.title || '';
    const label = this.configProps$.label || '';
    const showLabel = this.configProps$.showLabel || isDetailsTemplate(this.templateName$) || this.showLabel$;
    // label & showLabel within inheritedProps takes precedence over configProps
    this.label$ = this.inheritedProps$.label !== undefined ? this.inheritedProps$.label : label;
    this.showLabel$ = this.inheritedProps$.showLabel !== undefined ? this.inheritedProps$.showLabel : showLabel;

    // children may have a 'reference' so normalize the children array
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());

    this.visibility$ = this.configProps$.visibility ?? this.visibility$;

    /**
     * In instances where there is context, like with "shippingAddress," the pageReference becomes "caseInfo.content.shippingAddress."
     * This leads to problems in the getProperty API, as it incorrectly assesses the visibility condition by looking in the wrong location
     * in the Store for the property values. Reference component should be able to handle such scenarios(as done in SDK-R) since it has the
     * expected pageReference values, the View component currently cannot handle this.
     * The resolution lies in transferring this responsibility to the Reference component, eliminating the need for this code when Reference
     * component is able to handle it.
     */
    if (!this.configProps$.visibility && this.pConn.getPageReference().length > 'caseInfo.content'.length) {
      this.visibility$ = this.evaluateVisibility(this.pConn, this.configProps$.referenceContext);
    }

    // was:  this.arChildren$ = this.pConn.getChildren() as Array<any>;

    // debug
    // let  kidList: string = "";
    // for (let i in this.arChildren$) {
    //   kidList = kidList.concat(this.arChildren$[i].getPConnect().getComponentName()).concat(",");
    // }
    // console.log("-->view update: " + this.jsComponentPConnect.getComponentID(this) + ", template: " + this.templateName$ + ", kids: " + kidList);

    if (SUPPORTED_FORM_TEMPLATES.includes(this.templateName$)) {
      if (this.childrenComponents[0] !== undefined) {
        this.childrenComponents[0].update(this.pConn, this.arChildren$);
      } else {
        const templateComponentClass = getComponentFromMap(this.templateName$);
        const templateComponentInstance = new templateComponentClass(this.componentsManager, this.pConn, this.arChildren$);
        templateComponentInstance.init();
        this.childrenComponents.push(templateComponentInstance);
      }
    } else {
      const reconciledComponents = this.componentsManager.reconcileChildren(this);
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
          allFields = this.getAllFields(getPConnect);
          // eslint-disable-next-line no-case-declarations
          const unresFields = {
            primaryFields: allFields[0],
            secondaryFields: allFields[1]
          };
          propObj = getPConnect.resolveConfigProps(unresFields);
          break;

        case 'Details':
          allFields = this.getAllFields(getPConnect);
          propObj = {fields: allFields[0]};
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

  evaluateVisibility(pConn, referenceContext) {
    const visibilityExpression = pConn.meta.config.visibility;
    if (!visibilityExpression || visibilityExpression.length === 0) return true;

    let dataPage = this.getDataPage(pConn.getContextName(), referenceContext);
    if (!dataPage) return false;

    const visibilityConditions = visibilityExpression.replace("@E ", "")
    return PCore.getExpressionEngine().evaluate(visibilityConditions, dataPage, {
      pConnect: {
        getPConnect: () => {
          return this.pConn
        }
      }
    });
  }

  getDataPage(context, referenceContext) {
    let pageReferenceKeys = referenceContext.replace("caseInfo.content.", "").split('.');
    let page = PCore.getStore().getState()?.data[context].caseInfo.content;
    for (const key of pageReferenceKeys) {
      const arrayStartingBracketIndex = key.indexOf('[');
      const arrayEndingBracketIndex = key.indexOf(']');
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

}
