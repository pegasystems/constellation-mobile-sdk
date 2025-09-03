const TAG = "[NativeBridge]";
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

  updateComponent(component) {
    this.updateNativeComponent(component)
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
      console.log(TAG, `Native event not delivered, component #${id} not found.`);
    }
  }

  addNativeComponent(component) {
    if (component.compId === undefined) {
      console.error(TAG, `Cannot add component - missing id.`);
      return;
    }
    const id = parseInt(component.compId);
    if (component.type === undefined) {
      console.error(TAG, `Cannot add component #${id} - missing type.`);
      return;
    }
    console.log(TAG, `Adding component ${component.type}#${id}`)
    sdkbridge.addComponent(id, component.type);
  }

  removeNativeComponent(component) {
    if (component.compId === undefined) {
      console.error(TAG, `Cannot remove component - missing id.`);
      return;
    }
    const id = parseInt(component.compId);
    console.log(TAG, `Removing component #${id}`)
    sdkbridge.removeComponent(id);
  }

  updateNativeComponent(component) {
    if (component.compId === undefined) {
      console.error(TAG, `Cannot update component - missing id.`);
      return;
    }
    const id = parseInt(component.compId);
    if (component.props === undefined) {
      console.error(TAG, `Cannot update component #${id} - missing props.`);
      return;
    }
    const props = JSON.stringify(component.props)
    console.log(TAG, `Updating component ${component.type}#${id}, props: ${props}`);
    sdkbridge.updateComponent(id, props);
  }
}

export const bridge = new NativeBridge();
