import { ContainerBaseComponent } from "../container-base.component.js";

const TAG = "[DataReferenceComponent]";
const SELECTION_MODE = { SINGLE: "single", MULTI: "multi" };

export class DataReferenceComponent extends ContainerBaseComponent {
    props = {
        children: [],
        visible: true,
    };

    referenceType = "";
    selectionMode = "";
    parameters;
    hideLabel = false;
    dropDownDataSource = "";
    isDisplayModeEnabled = false;
    propsToUse = {};
    rawViewMetadata = {};
    viewName = "";
    firstChildMeta = {};
    canBeChangedInReviewMode = false;
    propName = "";
    firstChildPConnect;
    children;
    refList;
    displayAs;
    // Indicates first mount. Present also on web.
    isMounting = true
    latestOptionsRequestId = 0;

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "DataReference";
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);

        this.children = this.pConn.getChildren();
        this.#updateSelf();
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.checkAndUpdate();
        }
    }

    checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const newRawViewMetadata = this.pConn.getRawMetadata();
        const newParameters = this.pConn.getConfigProps().parameters;
        if (this.#parametersChanged(newParameters, newRawViewMetadata)) {
            const newRefList = newRawViewMetadata.config.referenceList;
            this.#loadOptions(newRefList, newParameters, newRawViewMetadata);
        }
        this.#updateProperties()
        this.isMounting = false;
    }

    #updateProperties() {
        const theConfigProps = this.pConn.getConfigProps();
        const label = theConfigProps.label;
        const showLabel = theConfigProps.showLabel;
        this.referenceType = theConfigProps.referenceType;
        this.selectionMode = theConfigProps.selectionMode;
        this.parameters = theConfigProps.parameters;
        this.hideLabel = theConfigProps.hideLabel;

        this.propsToUse = { label, showLabel, ...this.pConn.getInheritedProps() };
        if (this.propsToUse.showLabel === false) {
            this.propsToUse.label = "";
        }

        this.displayAs = theConfigProps.displayAs;
        const displayMode = theConfigProps.displayMode;
        this.rawViewMetadata = this.pConn.getRawMetadata();
        this.viewName = this.rawViewMetadata.name;
        this.firstChildMeta = this.rawViewMetadata.children[0];
        this.refList = this.rawViewMetadata.config.referenceList;
        this.canBeChangedInReviewMode =
            theConfigProps.allowAndPersistChangesInReviewMode &&
            (this.displayAs === "autocomplete" || this.displayAs === "dropdown");
        this.isDisplayModeEnabled = ["DISPLAY_ONLY", "STACKED_LARGE_VAL"].includes(displayMode);

        if (this.#shouldDisplayOnlySingle()) {
            const semanticLink = this.pConn.getChildren()[0];
            this.#handleDisplayOnly([semanticLink])
            return;
        }

        if (this.#shouldDisplayOnlyMulti()) {
            const semanticLinkChildren = this.#createSemanticLinkChildren();
            this.#handleDisplayOnly(semanticLinkChildren);
            return;
        }

        if (this.firstChildMeta?.type !== "Region") {
            this.firstChildPConnect = this.pConn.getChildren()[0].getPConnect;

            /* remove refresh When condition from those old view so that it will not be used for runtime */
            if (this.firstChildMeta.config?.readOnly) {
                delete this.firstChildMeta.config.readOnly;
            }

            this.#setChildDatasource(theConfigProps);

            if (this.firstChildMeta?.type === "Dropdown" && !this.firstChildMeta.config.deferDatasource) {
                this.firstChildMeta.config.datasource.source = this.rawViewMetadata.config?.parameters
                    ? this.dropDownDataSource
                    : "@DATASOURCE ".concat(this.refList).concat(".pxResults");
            } else if (this.firstChildMeta?.type === "AutoComplete") {
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
            if (this.firstChildMeta.type === "SimpleTableSelect" && this.selectionMode === SELECTION_MODE.MULTI) {
                this.propName = PCore.getAnnotationUtils().getPropertyName(this.firstChildMeta.config.selectionList);
            } else {
                this.propName = PCore.getAnnotationUtils().getPropertyName(this.firstChildMeta.config.value);
            }

            this.#generateChildrenToRender();
            this.reconcileChildren(this.children);
            this.#sendPropsUpdate();
        }
    }

    #parametersChanged(newParameters, newRawViewMetadata) {
        return JSON.stringify(newParameters) !== JSON.stringify(this.parameters) ||
            JSON.stringify(newRawViewMetadata) !== JSON.stringify(this.rawViewMetadata)
    }

    #loadOptions(refList, parameters, rawViewMetadata) {
        const requestId = ++this.latestOptionsRequestId;
        const firstChildMeta = rawViewMetadata.children[0];
        const firstChildPConnect = this.pConn.getChildren()[0].getPConnect();

        const shouldLoadOptions =
            (['Dropdown', 'Checkbox', 'RadioButtons'].includes(firstChildMeta?.type)) &&
            rawViewMetadata.config?.parameters &&
            !firstChildMeta.config.deferDatasource &&
            (
                firstChildMeta.config.variant !== 'card' ||
                (firstChildMeta.config.variant === 'card' &&
                    (!this.isMounting || (this.isMounting && !firstChildPConnect?.getSharedDataPageForReferenceList())))
            )
        if (!shouldLoadOptions) return;

        const { value = "", key = "", text = "" } = firstChildMeta.config?.datasource?.fields ?? {};
        Promise.resolve()
            .then(() => PCore.getDataApiUtils().getData(refList, { dataViewParameters: parameters }))
            .then((res) => {
                if (!this.alive || requestId !== this.latestOptionsRequestId) {
                    return;
                }
                if (res.data.data !== null) {
                    const ddDataSource = firstChildMeta.config.datasource.filterDownloadedFields
                        ? res.data.data
                        : res.data.data
                            .map((listItem) => ({
                                key: listItem[key.split(' .', 2)[1]],
                                text: listItem[text.split(' .', 2)[1]],
                                value: listItem[value.split(' .', 2)[1]]
                            }))
                            .filter((item) => item.key); // Filtering out undefined entries
                    this.dropDownDataSource = ddDataSource;
                    this.#updateProperties()
                } else {
                    const ddDataSource = [];
                    this.dropDownDataSource = ddDataSource;
                    this.#updateProperties()
                }
            })
            .catch((error) => {
                if (!this.alive || requestId !== this.latestOptionsRequestId) {
                    return;
                }

                console.warn(`${TAG} Failed to load selectable data`, error?.message || error);
                this.dropDownDataSource = [];
                this.#updateProperties();
            });
    }

    #sendPropsUpdate() {
        this.props = {
            children: this.getChildrenProps(),
            visible: this.propsToUse.visibility ?? this.props.visible,
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #shouldDisplayOnlySingle() {
        const isSingleMode = this.selectionMode === SELECTION_MODE.SINGLE;
        return isSingleMode &&
            (this.displayAs === 'readonly' || this.isDisplayModeEnabled) && !this.canBeChangedInReviewMode;
    }

    #shouldDisplayOnlyMulti() {
        const isMultiMode = this.selectionMode === SELECTION_MODE.MULTI;
        return isMultiMode &&
            (['readonly', 'readonlyMulti', 'map'].includes(this.displayAs) || this.isDisplayModeEnabled);
    }

    #handleDisplayOnly(children) {
        this.children = children;
        this.reconcileChildren(this.children);
        this.props = {
            label: this.propsToUse.label || "",
            children: this.getChildrenProps(),
            isDisplayOnly: true
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    // Creates a SemanticLink pConn per selected item, using primaryField as display text
    #createSemanticLinkChildren() {
        const selectionList = this.firstChildMeta.config?.selectionList;
        const primaryField = this.firstChildMeta.config?.primaryField;
        const referenceType = this.rawViewMetadata.config?.referenceType || '';
        const selectionKey = this.firstChildMeta.config?.selectionKey || '.pyGUID';

        if (!selectionList || !primaryField) {
            return [];
        }

        const referenceListData = this.pConn.getValue(selectionList);
        if (!referenceListData || !Array.isArray(referenceListData)) {
            return [];
        }

        const primaryFieldProp = primaryField.substring(1);
        const selectionListProp = selectionList.substring(1);
        const selectionKeyProp = selectionKey.substring(1);

        return referenceListData.map((child, index) => {
            const referenceLabel = child[primaryFieldProp] || '';

            const metadata = {
                type: 'SemanticLink',
                name: `SemanticLink_${child[selectionKeyProp] || index}`,
                config: {
                    text: referenceLabel,
                    referenceType,
                }
            };

            return PCore.createPConnect({
                meta: metadata,
                options: {
                    context: this.pConn.getContextName(),
                    pageReference: `${this.pConn.getPageReference()}.${selectionListProp}[${index}]`
                }
            });
        });
    }

    #updatePropertiesFromProps(theConfigProps) {

    }

    #generateChildrenToRender() {
        const theRecreatedFirstChild = this.#recreatedFirstChild();
        const viewsRegion = this.rawViewMetadata.children[1];
        if (viewsRegion?.name === "Views" && viewsRegion.children.length) {
            this.children = [theRecreatedFirstChild, ...this.children.slice(1)];
        } else {
            this.children = [theRecreatedFirstChild];
        }
    }

    #setChildDatasource(theConfigProps) {
        if (this.firstChildMeta == null) return;
        const { type } = this.firstChildMeta;
        if (type === 'AutoComplete') {
            this.#setAutoCompleteDatasource();
        } else if (['Dropdown', 'Checkbox', 'RadioButtons'].includes(type)) {
            this.#setSelectableDatasource();
        }
        const variant = this.firstChildMeta.config.variant;
        const isCardVariant = ['Checkbox', 'RadioButtons'].includes(type) && variant === 'card'
        if (isCardVariant) {
            this.firstChildMeta.config.imagePosition = theConfigProps.imagePosition;
            this.firstChildMeta.config.showImageDescription = theConfigProps.showImageDescription;
        }
    }

    #setAutoCompleteDatasource() {
        const { config } = this.firstChildMeta;
        config.datasource = this.refList;

        const hasParameters = this.rawViewMetadata.config?.parameters;
        if (hasParameters) {
            config.parameters = this.parameters;
        }
    }

    #setSelectableDatasource() {
        const { config } = this.firstChildMeta;

        if (!config.datasource || config.deferDatasource) {
            return;
        }
        const firstChildPConnect = this.pConn.getChildren()[0].getPConnect();
        const isDeferDataPageCallEnabled =
            this.rawViewMetadata.config?.parameters &&
            config.variant === 'card' &&
            this.isMounting &&
            !firstChildPConnect?.getSharedDataPageForReferenceList();

        config.datasource.source =
            (config.variant === 'card' && (this.dropDownDataSource || isDeferDataPageCallEnabled)) ||
            (config.variant !== 'card' && this.rawViewMetadata.config?.parameters)
                ? this.dropDownDataSource
                : `@DATASOURCE ${this.refList}.pxResults`;
    }

    // Re-create first child with overridden props
    // Memoized child in order to stop unmount and remount of the child component when data reference
    // rerenders without any actual change
    #recreatedFirstChild() {
        const { type, config } = this.firstChildMeta;
        if (this.firstChildMeta?.type !== "Region") {
            this.#setReadOnlyDisplayFlags();

            // In the case of a datasource with parameters you cannot load the dropdown before the parameters
            if (type === "Dropdown" && this.rawViewMetadata.config?.parameters && this.dropDownDataSource === null) {
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
                    ...(this.selectionMode === SELECTION_MODE.SINGLE ? { referenceType: this.referenceType } : ""),
                    dataRelationshipContext:
                        this.rawViewMetadata.config.contextClass && this.rawViewMetadata.config.name
                            ? this.rawViewMetadata.config.name
                            : null,
                    hideLabel: this.hideLabel,
                    onRecordChange: this.#handleSelection.bind(this),
                },
            });
        }
    }

    #setReadOnlyDisplayFlags() {
        const isSingleMode = this.selectionMode === SELECTION_MODE.SINGLE;

        const shouldDisplayOnlySingle = isSingleMode &&
            (this.displayAs === 'readonly' || this.isDisplayModeEnabled) &&
            !this.canBeChangedInReviewMode;

        if (shouldDisplayOnlySingle) {
            this.props.displayOnlySingle = true;
        }
    }

    #handleSelection(event) {
        const caseKey = this.pConn.getCaseInfo().getKey();
        const refreshOptions = { autoDetectRefresh: true };
        // AutoComplete sets value on event.id whereas Dropdown sets it on event.target.value
        const selectionValue = event?.id || event?.target?.value;

        const children = this.pConn.getRawMetadata()?.children;
        if (children?.length > 0 && children[0].config?.value) {
            refreshOptions.propertyName = children[0].config.value;
            refreshOptions.classID = this.pConn.getRawMetadata().classID;
        }

        // Skip manual refreshCaseView for picklist-based children (Dropdown, AutoComplete, Checkbox)
        // as they don't have an associated view configured and trigger refresh automatically
        const hasAssociatedViewConfigured = this.rawViewMetadata.children?.[1]?.children?.length;

        if (this.canBeChangedInReviewMode && this.pConn.getValue("__currentPageTabViewName")) {
            this.pConn
                .getActionsApi()
                .refreshCaseView(caseKey, this.pConn.getValue("__currentPageTabViewName"), "", refreshOptions)
                ?.catch((error) => {
                    console.warn(`${TAG} refreshCaseView failed (review mode)`, error?.name, error?.message);
                });
            PCore.getDeferLoadManager().refreshActiveComponents(this.pConn.getContextName());
        } else if (hasAssociatedViewConfigured) {
            const pgRef = this.pConn.getPageReference().replace("caseInfo.content", "");
            this.pConn
                .getActionsApi()
                .refreshCaseView(caseKey, this.viewName, pgRef, refreshOptions)
                ?.catch((error) => {
                    console.warn(`${TAG} refreshCaseView failed`, error?.name, error?.message);
                });
        }

        if (selectionValue && this.canBeChangedInReviewMode && this.isDisplayModeEnabled) {
            PCore.getDataApiUtils()
                .getCaseEditLock(caseKey, "")
                .then((caseResponse) => {
                    if (!this.alive) {
                        return;
                    }
                    const pageTokens = this.pConn.getPageReference().replace("caseInfo.content", "").split(".");
                    let curr = {};
                    const commitData = curr;

                    pageTokens.forEach((el) => {
                        if (el !== "") {
                            curr[el] = {};
                            curr = curr[el];
                        }
                    });

                    // expecting format like {Customer: {pyID:"C-100"}}
                    const propArr = this.propName.split(".");
                    propArr.forEach((element, idx) => {
                        if (idx + 1 === propArr.length) {
                            curr[element] = selectionValue;
                        } else {
                            curr[element] = {};
                            curr = curr[element];
                        }
                    });

                    PCore.getCaseUtils()
                        .updateCaseEditFieldsData(
                            caseKey,
                            { [caseKey]: commitData },
                            caseResponse.headers.etag,
                            this.pConn.getContextName()
                        )
                        .then((response) => {
                            if (!this.alive) {
                                return;
                            }
                            PCore.getContainerUtils().updateParentLastUpdateTime(
                                this.pConn.getContextName(),
                                response.data.data.caseInfo.lastUpdateTime
                            );
                            PCore.getContainerUtils().updateRelatedContextEtag(
                                this.pConn.getContextName(),
                                response.headers.etag
                            );
                        });
                });
        }
    }
}
