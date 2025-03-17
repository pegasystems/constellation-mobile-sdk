export class NativeBridge {
  componentsMap = {}

  addComponent(component) {
    this.componentsMap[component.compId] = component;
    this.addNativeComponent(component);
  }

  removeComponent(component) {
    delete this.componentsMap[component.compId];
    this.removeNativeComponent(component)
  }

  updateComponentProps(id, props) {
    sdkbridge.updateProps(id, JSON.stringify(props));
  }

  formFinished(successMessage) {
    sdkbridge.formFinished(successMessage);
  }

  formCancelled() {
    sdkbridge.formCancelled();
  }

  onEvent(id, event) {
    const component = this.componentsMap[id];
    if (component) {
      component.onEvent(event);
    } else {
      console.log(`Native event not delivered, component with id: ${id} not found.`);
    }
  }

  addNativeComponent(component) {
    const id = parseInt(component.compId); 
    if (component.type === undefined) {
      console.error(`Component ${id} is missing type.`);
    }
    console.log(`Adding native component with id: ${id} and type: '${component.type}'`)
    sdkbridge.addComponent(id, component.type);
  }

  removeNativeComponent(component) {
      const id = parseInt(component.compId);
      console.log(`Removing native component with id: ${id}`)
      sdkbridge.removeComponent(id);
  }
}

