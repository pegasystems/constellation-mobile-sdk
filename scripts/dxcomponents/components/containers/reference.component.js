export class ReferenceComponent {

  constructor() {
    throw new Error('ReferenceComponent should not be instantiated. Use static methods only.');
  }

  /**
   * Normalizes a PConnect object that might be a 'reference'.
   * If the incoming pConn is a reference, returns its dereferenced View PConnect's getPConnect.
   * Otherwise, returns the passed in pConn unchanged.
   *
   * @param inPConn (ex: { getPConnect()} )
   * @returns View PConnect's getPConnect
   */
  static normalizePConn(inPConn) {
    const newPConn = inPConn.getPConnect?.() ?? inPConn;
    const thePConnType = newPConn.getComponentName()
    if (thePConnType !== 'reference') {
      return inPConn;
    }
    const returnObj = inPConn.getPConnect !== undefined
    const refViewPConn = this._createFullReferencedViewFromRef(newPConn);
    return returnObj ? refViewPConn.getComponent() : refViewPConn;
  }

  static normalizePConnArray(inPConnArray) {
    return inPConnArray?.map(child => {
      return ReferenceComponent.normalizePConn(child);
    }) ?? [];
  }

  static _createFullReferencedViewFromRef(inPConn) {
    if (inPConn.getComponentName() !== 'reference') {
      throw new Error(`inPConn is not a reference. ${inPConn.getComponentName()}`);
    }

    const theResolvedConfigProps = inPConn.resolveConfigProps(inPConn.getConfigProps());
    const referenceConfig = {...inPConn.getComponentConfig()} || {};

    // name will not be passed to referenced view (but type and visibility will be passed)
    delete referenceConfig?.name;

    const viewMetadata = inPConn.getReferencedView();
    if (!viewMetadata) {
      throw new Error(`No view metadata found for reference: ${inPConn.getComponentConfig().name}`);
    }
    this._setShowLabelIfMissing(referenceConfig);

    const viewObject = {
      ...viewMetadata,
      config: {
        ...viewMetadata.config,
        ...referenceConfig,
        referenceContext: inPConn.getPageReference()
      }
    };
    const context = theResolvedConfigProps.context
    const viewComponent = inPConn.createComponent(viewObject, null, null, {
      pageReference: context && context.startsWith('@CLASS') ? '' : context
    });

    const newCompPConnect = viewComponent.getPConnect();

    newCompPConnect.setInheritedConfig({
      ...referenceConfig,
      readOnly: theResolvedConfigProps.readOnly ? theResolvedConfigProps.readOnly : false,
      displayMode: theResolvedConfigProps.displayMode ? theResolvedConfigProps.displayMode : null
    });

    return newCompPConnect;
  }

  /**
   Show label by default if 'label' is set but 'showLabel' is missing
   */
  static _setShowLabelIfMissing(referenceConfig) {
    const inheritedProps = referenceConfig?.inheritedProps ?? [];
    if (inheritedProps.some(prop => prop.prop === 'label') &&
      !inheritedProps.some(prop => prop.prop === 'showLabel')) {

      referenceConfig.inheritedProps.push(
        {
          prop: "showLabel",
          value: true
        }
      )
    }
  }
}
