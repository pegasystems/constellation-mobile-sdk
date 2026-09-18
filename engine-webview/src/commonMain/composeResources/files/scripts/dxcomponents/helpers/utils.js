export function deepEquals(oldValue, newValue) {
    return PCore.isDeepEqual(oldValue, newValue);
}

export class Utils {
    getOptionList(configProps, dataObject) {
        const listType = configProps.listType;

        if (listType == null) {
            return [];
        }

        switch (listType.toLowerCase()) {
            case "associated":
                return this.handleAssociatedList(configProps);
            case "datapage":
                return this.handleDataPageList(configProps, dataObject);
            default:
                return [];
        }
    }

    handleAssociatedList(configProps) {
        const dataSource = configProps.datasource;

        if (Array.isArray(dataSource)) {
            return dataSource;
        }

        return [];
    }

    handleDataPageList(configProps, dataObject) {
        const dataPage = configProps.datasource;

        if (dataObject && dataObject[dataPage]) {
            // alert('need to handle data page');
            return [];
        }

        let listSourceItems = configProps.listOutput;

        if (typeof dataPage === "object" && !Array.isArray(listSourceItems)) {
            listSourceItems = dataPage.source ? dataPage.source : [];
        }

        return this.transformListSourceItems(listSourceItems);
    }

    transformListSourceItems(listSourceItems) {
        return (listSourceItems || []).map((item) => {
            return { ...item, value: item.text || item.value };
        });
    }

    getBooleanValue(inValue) {
        let bReturn = false;

        if (typeof inValue === "string") {
            if (inValue.toLowerCase() === "true") {
                bReturn = true;
            }
        } else {
            bReturn = inValue;
        }

        return bReturn;
    }

    getStringValue(inValue) {
        if (typeof inValue === "string") {
            return inValue;
        } else {
            return inValue.toString();
        }
    }

    static hasViewContainer() {
        return sdkSessionStorage.getItem("hasViewContainer") == "true";
    }

    static setHasViewContainer(hasViewContainer) {
        sdkSessionStorage.setItem("hasViewContainer", hasViewContainer);
    }

    static okToInitFlowContainer() {
        return sdkSessionStorage.getItem("okToInitFlowContainer") == "true";
    }

    static setOkToInitFlowContainer(okToInit) {
        sdkSessionStorage.setItem("okToInitFlowContainer", okToInit);
    }

    resolveReferenceFields(item, hideFieldLabels, recordKey, pConnect, disabled) {
        const presets = (pConnect.getRawMetadata()?.config)?.presets ?? [];

        const presetChildren = presets[0]?.children?.[0]?.children ?? [];

        const maxFields = 5;
        return presetChildren.slice(0, maxFields).map((preset, index) => {
            const fieldMeta = {
                meta: {
                    ...preset,
                    config: {
                        ...preset.config,
                        displayMode: 'DISPLAY_ONLY',
                        disabled: disabled
                    }
                },
                useCustomContext: item
            };
            const configObj = PCore.createPConnect(fieldMeta);
            const meta = configObj.getPConnect().getMetadata();
            const fieldInfo = meta ? this.prepareComponentInCaseSummary(meta, configObj.getPConnect) : {};
            return hideFieldLabels
                ? { id: `${item[recordKey]} - ${index}`, value: fieldInfo.value }
                : {
                    id: `${item[recordKey]} - ${index}`,
                    name: fieldInfo.name,
                    value: fieldInfo.value,
                    type: preset.type
                };
        });
    }

    prepareComponentInCaseSummary(pConnectMeta, getPConnect) {
        const { config, children } = pConnectMeta;
        const pConnect = getPConnect();

        const caseSummaryComponentObject = {};

        caseSummaryComponentObject.name = pConnect.resolveConfigProps({ label: config.label }).label;

        const { type } = pConnectMeta;
        const createdComponent = pConnect.createComponent({
            type,
            children: children ? [...children] : [],
            config: {
                ...config
            }
        });

        caseSummaryComponentObject.value = createdComponent;
        return caseSummaryComponentObject;
    }
}
