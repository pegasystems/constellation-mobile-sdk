const TAG = "[NativeBridge]";
class NativeBridge {
    componentsMap = {};

    addComponent(component) {
        this.componentsMap[component.compId] = component;
        this.addNativeComponent(component);
    }

    removeComponent(component) {
        delete this.componentsMap[component.compId];
        this.removeNativeComponent(component);
    }

    updateComponent(component) {
        this.updateNativeComponent(component);
    }

    setRequestBody(body) {
        sdkbridge.setRequestBody(body);
    }

    onReady(envInfo) {
        sdkbridge.onReady(JSON.stringify(envInfo));
    }

    onFinished(successMessage) {
        sdkbridge.onFinished(successMessage);
    }

    onCancelled() {
        sdkbridge.onCancelled();
    }

    onError(type, message) {
        if (type == null || message == null) {
            console.error(TAG, "onError called with null or undefined type or message");
            return;
        }
        sdkbridge.onError(type, message);
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
        console.log(TAG, `Adding component ${component.type}#${id}`);
        sdkbridge.addComponent(id, component.type);
    }

    removeNativeComponent(component) {
        if (component.compId === undefined) {
            console.error(TAG, `Cannot remove component - missing id.`);
            return;
        }
        const id = parseInt(component.compId);
        console.log(TAG, `Removing component #${id}`);
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
        if (component.alive != null && component.alive === false) {
            console.debug(TAG, `Skipping component update #${id} - component is destroyed.`);
            return;
        }
        let componentProps = component.props;
        if (component.pConn) {
            componentProps["pConnectPropertyReference"] = this.#getPropertyReference(component.pConn);
        }

        const props = JSON.stringify(componentProps);
        console.log(TAG, `Updating component ${component.type}#${id}, props: ${props}`);
        sdkbridge.updateComponent(id, props);
    }

    /**
     * Retrieves the full reference for a PConnect object.
     * Falls back to constructing it manually if getFullReference is not available.
     */
    #getPropertyReference(pConn) {
        if (pConn.getFullReference) {
            // The `getFullReference` is not a public PConnect API, so check for its existence.
            return pConn.getFullReference();
        } else if (pConn.getPropertyName) {
            let pageReference = pConn.getPageReference();
            let propertyName = PCore.getAnnotationUtils().getPropertyName(pConn.getPropertyName());
            if (propertyName && !propertyName.startsWith(".")) {
                propertyName = `.${propertyName}`;
            }
            return `${pageReference}${propertyName}`;
        } else {
            console.warn(
                TAG,
                `Cannot determine full property reference for component. PConnect does not expose required methods.`
            );
            return "";
        }
    }
}

export const bridge = new NativeBridge();
