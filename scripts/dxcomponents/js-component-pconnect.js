// export interface JsComponentPConnectData {
//   compID?: string;
//   unsubscribeFn?: Function;
//   validateMessage?: string;
//   actions?: {
//     onChange: Function;
//     onBlur: Function;
//   };
// }

export class JsComponentPConnectService {

  /**
   * Local variable for access to the store once the service is connected to it.
   */
  theStore = null;

  /**
   * Local array used to store the association of an component to its most recent "props"
   *  where "props" is the object containing the component's getConfigProps along with
   * anything added by populateAdditionalProps.
   * Each entry is: { __componentID__: _the component's most recent props_ }
   */
  componentPropsArr = [];

  /* Used to toggle some class-wide logging */
  static bLogging = false;

  constructor() {
    // Establish necessary override flags for our use of Core
    // const coreOverrides = { "dynamicLoadComponents": false };
    // let coreOverrides = PCore.getBehaviorOverrides();
    // coreOverrides["dynamicLoadComponents"] = false;
    // PCore.setBehaviorOverrides( coreOverrides );
    PCore.setBehaviorOverride('dynamicLoadComponents', false);

    // Always best to use deep object compare when it's available
    // if (isEqual !== undefined) {
    // console.log(`JsComponentPConnect is using deep object compare`);
    // } else {
    // console.log(`JsComponentPConnect is using JSON.stringify compare`);
    // }
  }

  /**
   * The Calling object (inComp) subscribes to store changes.
   * @param inComp The component that's subscribing to the store
   * @param inCallback The component's callback function (typically called onStateChange) that will
   * be called when the store changes.
   * @returns The **unsubscribe** function that should be called when the component needs
   * to unsubscribe from the store. (Typically during ngOnDestroy)
   */
  subscribeToStore(inComp = null, inCallback = null) {
    // const theCompName: string = inComp ? `${inComp.constructor.name}` : 'no component provided';
    let fnUnsubscribe;
    // console.log( `Bridge subscribing: ${theCompName} `);
    if (inComp) {
      fnUnsubscribe = this.getStore().subscribe(inCallback);
    }
    return fnUnsubscribe;
  }

  /**
   * Gets the Component's properties that are used (a) to populate componentPropsArr
  //  and (b) to determine whether the component should update itself (re-render)
   * @param inComp The component whose properties are being obtained
   */
  getComponentProps(inComp = null) {
    let compProps = {};
    let addProps = {};

    if (inComp === null) {
      console.error(`JsComponentPConnect: getComponentProps called with bad component: ${inComp}`);
    }

    // if ((inComp.constructor.name === "FlowContainerComponent") || (inComp.constructor.name === "ViewContainerComponent")
    //     || (inComp.constructor.name === "ViewComponent") || (inComp.constructor.name === "DeferLoadComponent")) {
    //   console.log(`--> JsComponentPConnect getComponentProps: ${inComp.constructor.name}`);
    // }

    if (inComp.additionalProps !== undefined) {
      if (typeof inComp.additionalProps === 'object') {
        addProps = inComp.pConn.resolveConfigProps(inComp.additionalProps);
      } else if (typeof inComp.additionalProps === 'function') {
        const propsToAdd = inComp.additionalProps(PCore.getStore().getState(), inComp.pConn);
        addProps = inComp.pConn.resolveConfigProps(propsToAdd);
      }
    }

    compProps = inComp.pConn.getConfigProps();

    // const componentName = inComp.constructor.name;

    // The following comment is from the Nebula/Constellation version of this code. Meant as a reminder to check this occasionally
    // populate additional props which are component specific and not present in configurations
    // This block can be removed once all these props will be added as part of configs
    this.populateAdditionalProps(inComp, compProps)

    compProps = inComp.pConn.resolveConfigProps(compProps);

    if (compProps && undefined !== compProps.validatemessage && compProps.validatemessage != '') {
      // console.log( `   validatemessage for ${inComp.constructor.name} ${inComp.jsComponentPConnectData.compID}: ${compProps.validatemessage}`);
    }

    return {
      ...compProps,
      ...addProps
    };
  }

  /**
   * Returns the unique id for given component created when registering
   * Otherwise, return undefined.
   * @param inComp The component whose property is being requested.
   */
  getComponentID(inComp) {
    return inComp.bridgeComponentID || inComp.jsComponentPConnectData.compID;
  }

  /**
   * Returns the value of requested property for the component if it exists.
   * Otherwise, return undefined.
   * @param inComp The component whose property is being requested.
   * @param inProp The property being requested.
   */
  getComponentProp(inComp = null, inProp = '') {
    if (inComp === null) {
      console.error(`JsComponentPConnect: getComponentProp called with bad component: ${inComp}`);
    }

    const compID = inComp.jsComponentPConnectData.compID;

    // Look up property in the component's entry in componentPropArray (which should have the most recent value)
    return this.componentPropsArr[compID][inProp];
  }

  /**
   *
   * @returns The current complete set of resolved properties that are associated with
   * this component.
   * This is the full set of properties that are tracked in Redux for this component.
   */
  getCurrentCompleteProps(inComp = null) {
    if (inComp === null) {
      console.error(`JsComponentPConnect: getCurrentCompleteProps called with bad component: ${inComp}`);
    }
    return this.componentPropsArr[inComp.jsComponentPConnectData.compID];
  }

  /**
   * Registers the component and its callback function. When a component calls this method
   * (typically from its ngOnInit), the component is given a unique componentID (for this session)
   * and subscribes the component to the store. As a side effect, it also assigns the component's
   * actions (from its metadata) to the component's ___actions___ and binds the component's callback
   * (passed in as ___inCallback___) to the component. If a problem is encountered, an empty object,
   * {}, is returned.
   * @param inComp The component being registered and subscribed
   * @param inCallback The component's callback function (typically called onStateChange) that
   * will be called whenever the state changes.
   * @returns A JSON object with the following keys:
   * compID: the unique ID associated with this component,
   * unsubscribeFn: the function to be called when the component needs to unsubscribe from the store,
   * validateMessage: any validation/error message that gets generated for this object,
   * actions: any actions that are defined for this object
   */
  registerAndSubscribeComponent(inComp, inCallback = null) {
    const compId = inComp.compId
    // Create an initial object to be returned.
    const returnObject = {
      compID: '',
      unsubscribeFn: undefined,
      validateMessage: '',
      actions: undefined
    };

    if (inComp === null || inCallback === null) {
      console.error(`JsComponentPConnect: bad call to registerAndSubscribe: inComp: ${inComp} inCallback: ${inCallback}`);
      return returnObject;
    }

    const compType = inComp.constructor.name;

    if (JsComponentPConnectService.bLogging) {
      console.log(`registerAndSubscribeComponent: ${compType}`);
    }

    if (undefined !== inComp.bridgeComponentID) {
      console.error(`OLD SCHOOL: ${compType}`);
    }

    if (undefined === inComp.actions && undefined === inComp.jsComponentPConnectData) {
      console.error(`JsComponentPConnect: bad call to registerAndSubscribe from ${compType}: actions not defined as a class variable for inComp`);
      return returnObject;
    }
    if (undefined === inComp.bridgeComponentID && undefined === inComp.jsComponentPConnectData) {
      console.error(
        `JsComponentPConnect: bad call to registerAndSubscribe from ${compType}: bridgeComponentID not defined as a class variable for inComp`
      );
      return returnObject;
    }
    if (undefined === inComp.unsubscribeStore && undefined === inComp.jsComponentPConnectData) {
      console.error(
        `JsComponentPConnect: bad call to registerAndSubscribe from ${compType}: unsubscribeStore not defined as a class variable for inComp`
      );
      return returnObject;
    }
    if (undefined === inComp.validateMessage && undefined === inComp.jsComponentPConnectData) {
      console.error(`JsComponentPConnect: bad call to registerAndSubscribe from ${compType}: validateMessage not defined as a class variable for inComp`);
      return returnObject;
    }

    // call processActions to populate metadata with actions as in PConnectHOR initialize
    this.processActions(inComp);
    if (undefined === inComp.actions) {
      returnObject.actions = inComp.pConn.getActions();
    } else {
      inComp.actions = inComp.pConn.getActions();
    }

    // bind the provided callback to the component it's associated with
    inCallback = inCallback.bind(inComp);

    // Now proceed to register and subscribe...
    const theCompID = compId
    const theUnsub = this.subscribeToStore(inComp, inCallback);

    if (undefined === inComp.jsComponentPConnectData) {
      inComp.bridgeComponentID = theCompID;
    } else {
      returnObject.compID = theCompID;
      returnObject.unsubscribeFn = () => {
        console.log("unsubscribeFn for compId: ", theCompID);
        this.removeFormField(inComp);
        theUnsub();
      };
    }

    // initialize this components entry in the componentPropsArr
    this.componentPropsArr[theCompID] = {};
    if (!inComp.pConn.getConfigProps().readOnly) {
      this.addFormField(inComp);
    }

    // return object with compID and unsubscribe...
    return returnObject;
  }

  /**
   * Note: This functions internally marks 'isMounted' flag as true for field in formFieldsMap
   * This causes the field to be sent during submit.
   * (formFieldsMap[contextName].fieldOrder[propName].isMounted = true)
   * It does not add field itself to the formFieldsMap, it just marks it as mounted.
   * It also does not check if given field is editable or not so it may incorrectly set isMounted to true for readOnly fields.
   */
  addFormField(inComp) {
    inComp.pConn?.addFormField();
  }

  /**
   * Note: This functions internally marks 'isMounted' flag as false for field in formFieldsMap
   * This causes the field NOT to be sent during submit.
   * (formFieldsMap[contextName].fieldOrder[propName].isMounted = false)
   * It does not remove field itself from the formFieldsMap, it just marks it as unmounted.
   */
  removeFormField(inComp) {
    if (inComp.pConn?.removeFormField) {
      inComp.pConn?.removeFormField();
    }
  }

  /**
   * Note: This function internally adds field to formFieldsMap if it is editable.
   */
  populateAdditionalProps(inComp, compProps) {
    inComp.pConn.populateAdditionalProps(compProps);
  }

  // Returns true if the component's entry in ___componentPropsArr___ is
  //  the same as the inCompProps passed in.
  //  As a side effect, update the component's entry in componentPropsArr
  //  NOTE: It is assumed that the incoming component has the following:
  //  * a bridgeComponentID <string> property - used as lookup key in componentPropsArr
  //  * a pConn <?> property - used to access functions accessed in getComponentProps
  // Return true: means the component props are different and the component should update itself (re-render)
  // Return false: means the component props are the same and the component doesn't need to update (re-render)
  //  On bad input, return false;
  /**
   * Returns **true** if the component's entry in ___componentPropsArr___ is
   * the same as the properties that are current associated with the component (___inComp___) passed in.
   * As a side effect, the component's entry in ___componentPropsArr___ is updated.
   * **Note**: It is assumed that the incoming component has the following:
   * (a) a bridgeComponentID _string_ property used as lookup key in ___componentPropsArr___
   * and (b) a ___pConn___ property used to access functions called in ___getComponentProps___
   *
   * @param inComp The component asking if it should update itself
   * @returns Return **true**: means the component props are different and the component should update itself (re-render).
   * Return **false**: means the component props are the same and the component doesn't need to update (re-render).
   * If the ***inComp*** input is bad, false is also returned.
   */
  shouldComponentUpdate(inComp) {
    // const bShowLogging = false;
    let bRet = false;
    // check for reasonable input
    if (this.isEmptyObject(inComp)) {
      console.error(`JsComponentPConnect: bad call to shouldComponentUpdate: inComp: ${JSON.stringify(inComp)}`);
      return bRet;
    }
    if (undefined === inComp.validateMessage && undefined === inComp.jsComponentPConnectData) {
      console.error(`JsComponentPConnect: bad call to shouldComponentUpdate: ${inComp.constructor.name} does not have a validateMessage property.`);
    }

    const compID = this.getComponentID(inComp);

    const currentProps = this.componentPropsArr[compID];
    const currentPropsAsStr = JSON.stringify(currentProps);

    const incomingProps = this.getComponentProps(inComp);

    // pageMessages/httpMessages are sometimes undefined (when no errors) and sometimes [] (after clearing)
    // if pageMessages/httpMessages are [] then remove them to not trigger unnecessary component update
    if (this.isPageMessagesEmpty(incomingProps)) {
      inComp.jsComponentPConnectData.pageMessages = incomingProps.pageMessages;
      delete incomingProps.pageMessages;
    }
    if(this.isHttpMessagesEmpty(incomingProps)) {
      inComp.jsComponentPConnectData.httpMessages = incomingProps.httpMessages;
      delete incomingProps.httpMessages
    }

    const incomingPropsAsStr = JSON.stringify(incomingProps);

    bRet = currentPropsAsStr != incomingPropsAsStr;

    if (incomingProps.httpMessages) {
      inComp.jsComponentPConnectData.httpMessages = incomingProps.httpMessages;
      // httpMessages should not be stored in incomingProps in order to force component update if httpMessages does not change
      delete incomingProps.httpMessages
    }

    // Below piece of code is needed to re-render the component since we wanna evaluate the Visibility expression within View component in such cases
    if (inComp.pConn.meta.config.context?.length > 0 && inComp.pConn.getPageReference().length > 'caseInfo.content'.length) {
      return true;
    }

    // Now update the entry in componentPropsArr with the incoming value so
    //  we can compare against that next time...
    this.componentPropsArr[compID] = incomingProps;
    const validatemessage = incomingProps.validatemessage === undefined ? '' : this.htmlDecode(incomingProps.validatemessage);
    // and update the component's validation message (if undefined, it should be set to "")
    if (undefined !== inComp.jsComponentPConnectData) {
      inComp.jsComponentPConnectData.validateMessage = validatemessage;

      if (inComp.jsComponentPConnectData.validateMessage != '') {
        // this.psService.sendMessage(false);
        let sErrorMessage = currentProps && currentProps.label ? currentProps.label.concat(' - ') : '';
        sErrorMessage = sErrorMessage.concat(inComp.jsComponentPConnectData.validateMessage);
        // this.erService.sendMessage('update', sErrorMessage);
        console.error(`Validation error: ${sErrorMessage}`);
      }
    } else {
      inComp.validateMessage = validatemessage;
    }

    if (bRet && compID === undefined) {
      bRet = false;
    }

    // console.log( `JsComponentPConnect component ${compID} - ${inComp.constructor.name} - shouldComponentUpdate: ${bRet}`);
    // console.log("current props: " + currentPropsAsStr);

    if (bRet) {
      // console.log(`**** change for: ${inComp.constructor.name}`);
      // console.log("current props: " + currentPropsAsStr);
      // console.log("incoming props: " + incomingPropsAsStr);
      // console.log(`    ${inComp.constructor.name}: shouldComponentUpdate returning: ${bRet}, compId: ${compID}` );
      // console.log( `    Updating with componentProps for ${inComp.constructor.name}: ${JSON.stringify(this.componentPropsArr[compID])}`);
      // console.log( `          and validateMessage: ${inComp.validateMessage}`);
    }
    // else if (inComp.constructor.name.indexOf("View") >= 0 || inComp.constructor.name.indexOf("Root") >= 0) {
    //   console.log("no change");
    //   console.log("current props: " + currentPropsAsStr);
    //   console.log("incoming props: " + incomingPropsAsStr);
    //   console.log(`    ${inComp.constructor.name}: shouldComponentUpdate returning: ${bRet}, compId: ${compID}` );

    // }

    // console.log(`    ${inComp.constructor.name}: shouldComponentUpdate returning: ${bRet}`);

    return bRet;
  }

  isPageMessagesEmpty(incomingProps) {
    return incomingProps.pageMessages && incomingProps.pageMessages.length === 0;
  }

  isHttpMessagesEmpty(incomingProps) {
    return incomingProps.httpMessages && incomingProps.httpMessages.length === 0;
  }

  /**
   * Can be called when the component has encountered a change event
   * @param inComp The component calling the change event
   * @param event The event
   */
  changeHandler(inComp, event) {
    const bLogging = false;
    if (bLogging) {
      // console.log(`JsComponentPConnect.changeHandler`);
    }
    // check for reasonable input
    if (undefined === inComp || this.isEmptyObject(inComp)) {
      console.error(`JsComponentPConnect: bad call to changeHandler: inComp: ${JSON.stringify(inComp)}`);
      return;
    }

    const pConnect = inComp.pConn;
    if (undefined === pConnect) {
      console.error(`JsComponentPConnect: bad call to changeHandler: inComp.pConn: ${pConnect}`);
      return;
    }

    pConnect.getActionsApi().changeHandler(pConnect, event);
  }

  /**
   * Can be called when the component has encountered an event (such as blur)
   * @param inComp The component calling the event
   * @param event The event
   */
  eventHandler(inComp, event) {
    const bLogging = false;
    if (bLogging) {
      // console.log(`JsComponentPConnect.eventHandler`);
    }
    // check for reasonable input
    if (undefined === inComp || this.isEmptyObject(inComp)) {
      console.error(`JsComponentPConnect: bad call to eventHandler: inComp: ${JSON.stringify(inComp)}`);
      return;
    }

    const pConnect = inComp.pConn;
    if (undefined === pConnect) {
      console.error(`JsComponentPConnect: bad call to eventHandler: inComp.pConn: ${pConnect}`);
      return;
    }

    pConnect.getActionsApi().eventHandler(pConnect, event);
  }

  /**
   * @returns A handle to the application's store
   */
  getStore() {
    if (this.theStore === null) {
      this.theStore = PCore.getStore();
    }
    return this.theStore;
  }

  /**
   * @param bLogMsg If true, will write the stringified state to the store for debugging/inspection
   * @param inComp If supplied, the component that is requesting the store's state
   * @returns A handle to the __state__ of application's store
   */
  getState(bLogMsg = false, inComp = null) {
    const theState = this.getStore().getState();
    if (bLogMsg) {
      const theCompName = inComp ? `${inComp.constructor.name}: ` : '';
      console.log(`${theCompName} Store state: ${JSON.stringify(theState)}`);
    }
    return theState;
  }

  // processActions - carried over from PConnectHOC initialize
  /**
   *  processActions exposes all actions in the metadata.
   *  Attaches common handler (eventHandler) for all actions.
   */
  processActions(inComp) {
    const pConnect = inComp.pConn;
    if (undefined === pConnect) {
      console.error(`JsComponentPConnect: bad call to processActions: pConn: ${pConnect} from component: ${inComp.constructor.name}`);
      return;
    }

    if (inComp.pConn.isEditable()) {
      inComp.pConn.setAction('onChange', this.changeHandler.bind(this));
      inComp.pConn.setAction('onBlur', this.eventHandler.bind(this));
    }
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  htmlDecode(sVal) {
    const doc = new DOMParser().parseFromString(sVal, 'text/html');
    return doc.documentElement.textContent;
  }
}
