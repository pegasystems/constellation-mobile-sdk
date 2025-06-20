import { ReferenceComponent } from './reference.component.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import {ContainerBaseComponent} from './container-base.component.js';

export class ViewComponent extends ContainerBaseComponent {

  DETAILS_TEMPLATES = [
    'Details', 'DetailsFields', 'DetailsOneColumn', 'DetailsSubTabs', 'DetailsThreeColumn',
    'DetailsTwoColumn', 'NarrowWideDetails', 'WideNarrowDetails'
  ];
  SUPPORTED_FORM_TEMPLATES = ['DefaultForm', 'SimpleTable'];

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
    this.componentsManager.onComponentPropsUpdate(this);
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.jsComponentPConnectData.unsubscribeFn?.();
      this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
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

    if (this.SUPPORTED_FORM_TEMPLATES.includes(templateName)) {
      if (this.childrenComponents[0] !== undefined) {
        this.childrenComponents[0].update(this.pConn, this.childrenPConns);
      } else {
        const templateComponentClass = getComponentFromMap(templateName);
        const templateComponentInstance = new templateComponentClass(this.componentsManager, this.pConn, this.childrenPConns);
        templateComponentInstance.init();
        this.childrenComponents.push(templateComponentInstance);
      }
    } else {
      const reconciledComponents = this.reconcileChildren();
      this.childrenComponents = reconciledComponents.map((item) => item.component);
      this.initReconciledComponents(reconciledComponents);
    }

    this.props.children = this.getChildrenComponentsIds();
    this.componentsManager.onComponentPropsUpdate(this)
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
