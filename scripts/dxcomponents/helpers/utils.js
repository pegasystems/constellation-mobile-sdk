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
}
