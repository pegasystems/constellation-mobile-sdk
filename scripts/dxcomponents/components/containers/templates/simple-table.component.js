import { Utils } from '../../../helpers/utils.js';
import {getComponentFromMap} from '../../../mappings/sdk-component-map.js';

export class SimpleTableComponent {
  pConn$;
  jsComponentPConnect;
  jsComponentPConnectData = {};
  compId;
  type;
  childComponent;

  props = {
    child: undefined
  }

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.utils = new Utils();
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.type = "SimpleTable"
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
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
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.props.label = configProps.label;

    if (configProps.value !== undefined) {
      this.props.value = configProps.value;
    }

    if (configProps.visibility != null) {
      this.props.visible = this.utils.getBooleanValue(configProps.visibility);
    }

    ////
    const { multiRecordDisplayAs } = configProps;
    let { contextClass } = configProps;
    if (!contextClass) {
      let listName = this.pConn$.getComponentConfig().referenceList;
      listName = PCore.getAnnotationUtils().getPropertyName(listName);
      contextClass = this.pConn$.getFieldMetadata(listName)?.pageClass;
    }
    if (multiRecordDisplayAs === 'fieldGroup') {
      const fieldGroupProps = { ...configProps, contextClass };
      if (this.childComponent === undefined) {
        const fieldGroupTemplateClass = getComponentFromMap("FieldGroupTemplate");
        const fieldGroupTemplateInstance = new fieldGroupTemplateClass(this.componentsManager, this.pConn$, fieldGroupProps);
        fieldGroupTemplateInstance.init();
        this.childComponent = fieldGroupTemplateInstance;
      } else {
        this.childComponent.update(this.pConn$, fieldGroupProps)
      }
    } else {
      // this branch is not supported yet
      const {
        label: labelProp,
        propertyLabel,
        displayMode,
        fieldMetadata,
        hideLabel,
        parameters,
        isDataObject,
        type,
        ruleClass,
        authorContext,
        name
      } = configProps;

      const label = labelProp || propertyLabel;

      const propsToUse = { label, ...this.pConn$.getInheritedProps() };
      const isDisplayModeEnabled = displayMode === 'DISPLAY_ONLY';

      if (fieldMetadata && fieldMetadata.type === 'Page List' && fieldMetadata.dataRetrievalType === 'refer') {
        const {
          children: [{ children: rawFields }],
          parameters: rawParams
        } = (this.pConn$.getRawMetadata()).config;

        if (isDisplayModeEnabled && hideLabel) {
          propsToUse.label = '';
        }

        const metaForListView = this.buildMetaForListView(
          fieldMetadata,
          rawFields,
          type,
          ruleClass,
          name,
          propsToUse.label,
          isDataObject,
          parameters // resolved params
        );

        const metaForPConnect = JSON.parse(JSON.stringify(metaForListView));
        // @ts-ignore - PCore.getMetadataUtils().getPropertyMetadata - An argument for 'currentClassID' was not provided.
        metaForPConnect.config.parameters = rawParams ?? PCore.getMetadataUtils().getPropertyMetadata(name)?.datasource?.parameters;

        const { referenceListStr: referenceList } = this.getContext(this.pConn$);
        let requiredContextForQueryInDisplayMode = {};
        if (isDisplayModeEnabled) {
          requiredContextForQueryInDisplayMode = {
            referenceList
          };
        }
        const options = {
          context: this.pConn$.getContextName(),
          pageReference: this.pConn$.getPageReference(),
          ...requiredContextForQueryInDisplayMode
        };

        this.refToPConnect = PCore.createPConnect({ meta: metaForPConnect, options }).getPConnect();

        this.listViewProps = {
          ...metaForListView.config,
          displayMode,
          fieldName: authorContext
        };
      }
    }
    ////
    this.sendPropsUpdate();
  }


  onEvent(event) {
    this.childComponent.onEvent(event)
  }

  sendPropsUpdate() {
    this.props = {
      child: this.childComponent.compId
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  //helpers
  buildMetaForListView(fieldMetadata, fields, type, ruleClass, name, propertyLabel, isDataObject, parameters) {
    return {
      name,
      config: {
        type,
        referenceList: fieldMetadata.datasource.name,
        parameters: parameters ?? fieldMetadata.datasource.parameters,
        personalization: false,
        isDataObject,
        grouping: true,
        globalSearch: true,
        reorderFields: true,
        toggleFieldVisibility: true,
        title: propertyLabel,
        personalizationId: '' /* TODO */,
        template: 'ListView',
        presets: [
          {
            name: 'presets',
            template: 'Table',
            config: {},
            children: [
              {
                name: 'Columns',
                type: 'Region',
                children: fields
              }
            ],
            label: propertyLabel,
            id: 'P_' /* TODO */
          }
        ],
        ruleClass
      }
    };
  };

  getContext(thePConn) {
    const contextName = thePConn.getContextName();
    const pageReference = thePConn.getPageReference();
    // 8.7 change = referenceList may now be in top-level of state props,
    //  not always in config of state props
    let { referenceList } = thePConn.getStateProps()?.config || thePConn.getStateProps();
    const pageReferenceForRows = referenceList.startsWith('.') ? `${pageReference}.${referenceList.substring(1)}` : referenceList;

    // removing "caseInfo.content" prefix to avoid setting it as a target while preparing pageInstructions
    referenceList = pageReferenceForRows.replace(PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT, '');

    return {
      contextName,
      referenceListStr: referenceList,
      pageReferenceForRows
    };
  };
}
