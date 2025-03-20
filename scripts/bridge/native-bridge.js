class NativeBridge {
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
    sdkbridge.updateComponent(id, JSON.stringify(props));
  }

  setRequestBody(body) {
    sdkbridge.setRequestBody(body);
  }

  onReady() {
    sdkbridge.onReady();
  }

  onFinished(successMessage) {
    sdkbridge.onFinished(successMessage);
  }

  onCancelled() {
    sdkbridge.onCancelled();
  }

  onError(error) {
    sdkbridge.onError(error);
  }

  onEvent(id, event) {
    const component = this.componentsMap[id];
    if (component) {
      component.onEvent(event);
    } else {
      console.log(`[Bridge] Native event not delivered, component #${id} not found.`);
    }
  }

  addNativeComponent(component) {
    const id = parseInt(component.compId);
    if (component.type === undefined) {
      console.error(`[Bridge] Component #{id} is missing type.`);
    }
    console.log(`[Bridge] Adding component ${component.type}#${id}`)
    sdkbridge.addComponent(id, component.type);
  }

  removeNativeComponent(component) {
    const id = parseInt(component.compId);
    console.log(`[Bridge] Removing component #${id}`)
    sdkbridge.removeComponent(id);
  }
}

export const bridge = new NativeBridge();
