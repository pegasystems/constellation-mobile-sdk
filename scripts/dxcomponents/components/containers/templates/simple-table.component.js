import { Utils } from "../../../helpers/utils.js";
import { BaseComponent } from "../../base.component.js";

const TAG = "[SimpleTableComponent]";

export class SimpleTableComponent extends BaseComponent {
   jsComponentPConnectData = {};
   childComponent;
   props = {
      child: undefined,
   };

   constructor(componentsManager, pConn) {
      super(componentsManager, pConn);
      this.type = "SimpleTable";
      this.utils = new Utils();
   }

   init() {
      this.componentsManager.onComponentAdded(this);
      this.checkAndUpdate();
   }

   destroy() {
      this.childComponent.destroy?.();
      this.props.child = undefined;
      this.componentsManager.onComponentPropsUpdate(this);
      this.componentsManager.onComponentRemoved(this);
   }

   update(pConn) {
      if (this.pConn !== pConn) {
         this.pConn = pConn;
      }
      this.checkAndUpdate();
   }

   checkAndUpdate() {
      this.#updateSelf();
   }

   #updateSelf() {
      const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
      this.props.label = configProps.label;

      if (configProps.value !== undefined) {
         this.props.value = configProps.value;
      }

      if (configProps.visibility != null) {
         this.props.visible = this.utils.getBooleanValue(configProps.visibility);
      }

      const { multiRecordDisplayAs } = configProps;
      let { contextClass } = configProps;
      if (!contextClass) {
         let listName = this.pConn.getComponentConfig().referenceList;
         listName = PCore.getAnnotationUtils().getPropertyName(listName);
         contextClass = this.pConn.getFieldMetadata(listName)?.pageClass;
      }
      if (multiRecordDisplayAs === "fieldGroup") {
         const fieldGroupProps = { ...configProps, contextClass };
         this.childComponent = this.componentsManager.upsert(this.childComponent, "FieldGroupTemplate", [
            this.pConn,
            fieldGroupProps,
         ]);
         this.#sendPropsUpdate();
      } else {
         console.log(
            TAG,
            `Unsupported display mode: ${multiRecordDisplayAs}. ListView and SimpleTableManual are not supported yet.`
         );
      }
   }

   onEvent(event) {
      // TODO: remove optional call when other modes are implemented so that child component is always defined
      this.childComponent?.onEvent(event);
   }

   #sendPropsUpdate() {
      this.props = {
         child: this.childComponent.compId,
      };
      this.componentsManager.onComponentPropsUpdate(this);
   }
}
