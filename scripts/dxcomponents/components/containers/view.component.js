import { ReferenceComponent } from './reference.component.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import {ContainerBaseComponent} from './container-base.component.js';
import {SimpleTableComponent} from './templates/simple-table.component.js';

const TAG = '[ViewComponent]';

export class ViewComponent extends ContainerBaseComponent {

  DETAILS_TEMPLATES = [
    'Details', 'DetailsFields', 'DetailsOneColumn', 'DetailsSubTabs', 'DetailsThreeColumn',
    'DetailsTwoColumn', 'NarrowWideDetails', 'WideNarrowDetails'
  ];

  FORM_TEMPLATES = ['DefaultForm', 'OneColumn', 'TwoColumn', 'ThreeColumn', 'WideNarrow'];
  SUPPORTED_FORM_TEMPLATES = ['DefaultForm', 'OneColumn'];

  jsComponentPConnectData = {};
  props = {
    children: [],
    visible: true,
    label: '',
    showLabel: false
  };

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
    this.componentsManager.onComponentAdded(this);
    this.#checkAndUpdate();
  }

  destroy() {
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
    })
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

    const templateName = configProps.template ?? '';
    const label = configProps.label ?? '';
    const showLabel = configProps.showLabel || this.#isDetailsTemplate(templateName) || this.props.showLabel;

    this.props.label = inheritedProps.label ?? label;
    this.props.showLabel = inheritedProps.showLabel ?? showLabel;
    this.props.visible = configProps.visibility ?? this.props.visible;
    /**
     * In instances where there is context, like with "shippingAddress," the pageReference becomes "caseInfo.content.shippingAddress."
     * This leads to problems in the getProperty API, as it incorrectly assesses the visibility condition by looking in the wrong location
     * in the Store for the property values. Reference component should be able to handle such scenarios(as done in SDK-R) since it has the
     * expected pageReference values, the View component currently cannot handle this.
     * The resolution lies in transferring this responsibility to the Reference component, eliminating the need for this code when Reference
     * component is able to handle it.
     */
    if (!configProps.visibility && this.pConn.getPageReference().length > 'caseInfo.content'.length) {
      this.props.visible = this.#evaluateVisibility(this.pConn, configProps.referenceContext);
    }

    // children may have a 'reference' so normalize the children array
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());

    if (templateName !== '') {
      if (this.FORM_TEMPLATES.includes(templateName)) {
        const template = this.SUPPORTED_FORM_TEMPLATES.includes(templateName) ? templateName : 'DefaultForm';
        this.#reconcileFormTemplateChildComponent(template);
      } else if (templateName === 'SimpleTable') {
        this.#reconcileSimpleTableChildComponent();
      } else {
        console.warn(TAG, `${templateName} not supported. Rendering children components directly.`);
        this.#reconcileChildrenComponents()
      }
    } else {
      this.#reconcileChildrenComponents()
    }

    this.props.children = this.getChildrenComponentsIds();
    this.componentsManager.onComponentPropsUpdate(this)
  }

  #reconcileFormTemplateChildComponent(templateName) {
    if (this.childrenComponents.length === 0) {
      this.childrenComponents.push(this.#createFormTemplateChildComponent(templateName));
    } else if (this.childrenComponents.length > 0) {
      if (this.childrenComponents[0].type === templateName && this.isEqualNameType(this.childrenComponents[0].pConn, this.pConn)) {
        this.childrenComponents[0].update(this.pConn, this.childrenPConns);
      } else {
        this.destroyChildren();
        this.childrenComponents.push(this.#createFormTemplateChildComponent(templateName));
      }
    }
  }

  #createFormTemplateChildComponent(templateName) {
    const templateComponentClass = getComponentFromMap(templateName);
    const templateComponentInstance = new templateComponentClass(this.componentsManager, this.pConn, this.childrenPConns);
    templateComponentInstance.init();
    return templateComponentInstance;
  }

  #reconcileSimpleTableChildComponent() {
    if (this.childrenComponents.length === 0) {
      this.childrenComponents.push(this.#createSimpleTableChildComponent());
    } else if (this.childrenComponents.length > 0) {
      if (this.childrenComponents[0] instanceof SimpleTableComponent && this.isEqualNameType(this.childrenComponents[0].pConn, this.pConn)) {
        this.childrenComponents[0].update(this.pConn);
      } else {
        this.destroyChildren();
        this.childrenComponents.push(this.#createSimpleTableChildComponent());
      }
    }
  }

  #createSimpleTableChildComponent() {
    const simpleTableComponent = new SimpleTableComponent(this.componentsManager, this.pConn);
    simpleTableComponent.init();
    return simpleTableComponent;
  }

  #reconcileChildrenComponents() {
    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);
  }

  #evaluateVisibility(pConn, referenceContext) {
    const visibilityExpression = pConn.meta.config.visibility;
    if (!visibilityExpression || visibilityExpression.length === 0) return true;

    let dataPage = this.#getDataPage(pConn.getContextName(), referenceContext);
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

  #getDataPage(context, referenceContext) {
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

  #isDetailsTemplate(template) {
    return this.DETAILS_TEMPLATES.includes(template);
  }
}
