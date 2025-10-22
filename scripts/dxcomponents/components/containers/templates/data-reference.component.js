import {ContainerBaseComponent} from '../container-base.component.js';

const TAG = '[DataReferenceComponent]';
const SELECTION_MODE = { SINGLE: 'single', MULTI: 'multi' };

export class DataReferenceComponent extends ContainerBaseComponent {

  jsComponentPConnectData = {};
  props = {
    children: [],
    visible: true
  };

  referenceType = '';
  selectionMode = '';
  parameters;
  hideLabel = false;
  dropDownDataSource = '';
  isDisplayModeEnabled = false;
  propsToUse= {};
  rawViewMetadata= {};
  viewName = '';
  firstChildMeta= {};
  canBeChangedInReviewMode = false;
  propName = '';
  firstChildPConnect;
  children;
  displaySingleRef;
  displayMultiRef;
  refList;


  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.type = "DataReference";
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
    this.componentsManager.onComponentAdded(this);

    // added
    this.children = this.pConn.getChildren();
    this.updateSelf();
    if (this.firstChildMeta?.type === 'Dropdown' && this.rawViewMetadata.config?.parameters) {
      const { value, key, text } = this.firstChildMeta.config.datasource.fields;
      PCore.getDataApiUtils()
        .getData(
          this.refList,
          {
            dataViewParameters: this.parameters
          },
          ''
        )
        .then(res => {
          if (res.data.data !== null) {
            const ddDataSource = res.data.data
              .map(listItem => ({
                key: listItem[key.split(' .', 2)[1]],
                text: listItem[text.split(' .', 2)[1]],
                value: listItem[value.split(' .', 2)[1]]
              }))
              .filter(item => item.key);
            // Filtering out undefined entries that will break preview
            this.dropDownDataSource = ddDataSource;
            this.updateSelf();
          } else {
            const ddDataSource = [];
            this.dropDownDataSource = ddDataSource;
          }
        })
        .catch(() => {
          return Promise.resolve({
            data: { data: [] }
          });
        });
    }
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
      this.checkAndUpdate();
    }
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    // Update properties based on configProps
    const theConfigProps = this.pConn.getConfigProps();
    this.updatePropertiesFromProps(theConfigProps);

    const displayAs = theConfigProps.displayAs;
    const displayMode = theConfigProps.displayMode;
    this.rawViewMetadata = this.pConn.getRawMetadata();
    this.viewName = this.rawViewMetadata.name;
    this.firstChildMeta = this.rawViewMetadata.children[0];
    this.refList = this.rawViewMetadata.config.referenceList;
    this.canBeChangedInReviewMode = theConfigProps.allowAndPersistChangesInReviewMode && (displayAs === 'autocomplete' || displayAs === 'dropdown');
    this.isDisplayModeEnabled = ['DISPLAY_ONLY', 'STACKED_LARGE_VAL'].includes(displayMode);

    if (this.firstChildMeta?.type !== 'Region') {
      this.firstChildPConnect = this.pConn.getChildren()[0].getPConnect;

      /* remove refresh When condition from those old view so that it will not be used for runtime */
      if (this.firstChildMeta.config?.readOnly) {
        delete this.firstChildMeta.config.readOnly;
      }
      if (this.firstChildMeta?.type === 'Dropdown') {
        this.firstChildMeta.config.datasource.source = this.rawViewMetadata.config?.parameters
          ? this.dropDownDataSource
          : '@DATASOURCE '.concat(this.refList).concat('.pxResults');
      } else if (this.firstChildMeta?.type === 'AutoComplete') {
        this.firstChildMeta.config.datasource = this.refList;

        /* Insert the parameters to the component only if present */
        if (this.rawViewMetadata.config?.parameters) {
          this.firstChildMeta.config.parameters = this.parameters;
        }
      }
      // set displayMode conditionally
      if (!this.canBeChangedInReviewMode) {
        this.firstChildMeta.config.displayMode = displayMode;
      }
      if (this.firstChildMeta.type === 'SimpleTableSelect' && this.selectionMode === SELECTION_MODE.MULTI) {
        this.propName = PCore.getAnnotationUtils().getPropertyName(this.firstChildMeta.config.selectionList);
      } else {
        this.propName = PCore.getAnnotationUtils().getPropertyName(this.firstChildMeta.config.value);
      }

      this.generateChildrenToRender();
      this.reconcileChildren(this.children);
      this.sendPropsUpdate();
    }
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {
      component.onEvent(event);
    })
  }

  sendPropsUpdate() {
    this.props = {
      children: this.getChildrenComponentsIds(),
      visible: this.propsToUse.visibility ?? this.props.visible
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  updatePropertiesFromProps(theConfigProps) {
    const label = theConfigProps.label;
    const showLabel = theConfigProps.showLabel;
    this.referenceType = theConfigProps.referenceType;
    this.selectionMode = theConfigProps.selectionMode;
    this.parameters = theConfigProps.parameters;
    this.hideLabel = theConfigProps.hideLabel;

    this.propsToUse = { label, showLabel, ...this.pConn.getInheritedProps() };
    if (this.propsToUse.showLabel === false) {
      this.propsToUse.label = '';
    }
  }

  generateChildrenToRender() {
    const theRecreatedFirstChild = this.recreatedFirstChild();
    const viewsRegion = this.rawViewMetadata.children[1];
    if (viewsRegion?.name === 'Views' && viewsRegion.children.length) {
      this.children = [theRecreatedFirstChild, ...this.children.slice(1)];
    } else {
      this.children = [theRecreatedFirstChild];
    }
  }

  // Re-create first child with overridden props
  // Memoized child in order to stop unmount and remount of the child component when data reference
  // rerenders without any actual change
  recreatedFirstChild() {
    const { type, config } = this.firstChildMeta;
    if (this.firstChildMeta?.type !== 'Region') {
      this.pConn.clearErrorMessages({
        property: this.propName,
        category: '',
        context: ''
      });
      if (!this.canBeChangedInReviewMode && this.isDisplayModeEnabled && this.selectionMode === SELECTION_MODE.SINGLE) {
        this.displaySingleRef = true;
      }

      if (this.isDisplayModeEnabled && this.selectionMode === SELECTION_MODE.MULTI) {
        this.displayMultiRef = true;
      }

      // In the case of a datasource with parameters you cannot load the dropdown before the parameters
      if (type === 'Dropdown' && this.rawViewMetadata.config?.parameters && this.dropDownDataSource === null) {
        return null;
      }

      return this.firstChildPConnect().createComponent({
        type,
        config: {
          ...config,
          required: this.propsToUse.required,
          visibility: this.propsToUse.visibility,
          disabled: this.propsToUse.disabled,
          label: this.propsToUse.label,
          viewName: this.pConn.getCurrentView(),
          parameters: this.rawViewMetadata.config.parameters,
          readOnly: false,
          localeReference: this.rawViewMetadata.config.localeReference,
          ...(this.selectionMode === SELECTION_MODE.SINGLE ? { referenceType: this.referenceType } : ''),
          dataRelationshipContext:
            this.rawViewMetadata.config.contextClass && this.rawViewMetadata.config.name ? this.rawViewMetadata.config.name : null,
          hideLabel: this.hideLabel,
          onRecordChange: this.handleSelection.bind(this)
        }
      });
    }
  }

  handleSelection(event) {
    const caseKey = this.pConn.getCaseInfo().getKey();
    const refreshOptions = { autoDetectRefresh: true };
    if (this.canBeChangedInReviewMode && this.pConn.getValue('__currentPageTabViewName')) {
      this.pConn.getActionsApi().refreshCaseView(caseKey, this.pConn.getValue('__currentPageTabViewName'), '', refreshOptions);
      PCore.getDeferLoadManager().refreshActiveComponents(this.pConn.getContextName());
    } else {
      const pgRef = this.pConn.getPageReference().replace('caseInfo.content', '');
      this.pConn.getActionsApi().refreshCaseView(caseKey, this.viewName, pgRef, refreshOptions);
    }

    // AutoComplete sets value on event.id whereas Dropdown sets it on event.target.value
    const propValue = event?.id || event?.target?.value;
    if (propValue && this.canBeChangedInReviewMode && this.isDisplayModeEnabled) {
      PCore.getDataApiUtils()
        .getCaseEditLock(caseKey, '')
        .then(caseResponse => {
          const pageTokens = this.pConn.getPageReference().replace('caseInfo.content', '').split('.');
          let curr = {};
          const commitData = curr;

          pageTokens.forEach(el => {
            if (el !== '') {
              curr[el] = {};
              curr = curr[el];
            }
          });

          // expecting format like {Customer: {pyID:"C-100"}}
          const propArr = this.propName.split('.');
          propArr.forEach((element, idx) => {
            if (idx + 1 === propArr.length) {
              curr[element] = propValue;
            } else {
              curr[element] = {};
              curr = curr[element];
            }
          });

          PCore.getCaseUtils()
            .updateCaseEditFieldsData(caseKey, { [caseKey]: commitData }, caseResponse.headers.etag, this.pConn.getContextName())
            .then(response => {
              PCore.getContainerUtils().updateParentLastUpdateTime(this.pConn.getContextName(), response.data.data.caseInfo.lastUpdateTime);
              PCore.getContainerUtils().updateRelatedContextEtag(this.pConn.getContextName(), response.headers.etag);
            });
        });
    }
  }
}
