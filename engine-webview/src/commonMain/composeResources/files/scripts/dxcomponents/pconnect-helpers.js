const CONTEXT_TREE_ANNOTATIONS = new Set(["@P", "@ADDRESS"]);

function trimAnnotation(annotation) {
    if (typeof annotation !== "string") {
        return annotation;
    }

    const spaceIndex = annotation.indexOf(" ");
    const format = annotation.substring(0, spaceIndex);
    if (!CONTEXT_TREE_ANNOTATIONS.has(format)) {
        return annotation;
    }

    return annotation.substring(spaceIndex + 1);
}

export function hasRegisteredViewNode(pConn) {
    return pConn.getRawMetadata()?.type?.toLowerCase() === "view" && !!pConn.viewName;
}

export function populateAdditionalProps(inComp, compProps) {
    const pConn = inComp.pConn;
    if (typeof pConn.removeNode !== "function" || !hasRegisteredViewNode(pConn)) {
        return pConn.populateAdditionalProps(compProps);
    }

    // CoreJS may use the data-reference name to remove a hidden View, deleting its parent instead.
    const originalRemoveNode = pConn.removeNode;
    const ownDescriptor = Object.getOwnPropertyDescriptor(pConn, "removeNode");
    pConn.removeNode = (...args) => {
        if (pConn.isVisible()) {
            return originalRemoveNode.apply(pConn, args);
        }
        return removeNode(inComp);
    };
    try {
        return pConn.populateAdditionalProps(compProps);
    } finally {
        if (ownDescriptor) {
            Object.defineProperty(pConn, "removeNode", ownDescriptor);
        } else {
            delete pConn.removeNode;
        }
    }
}

/**
 * Removes a component and its descendants from the context tree.
 * Uses the registered View identity; other nodes retain CoreJS removal semantics.
 * Unlike CoreJS 25.1.4, also removes visible nodes during component teardown.
 */
export function removeNode(inComp) {
    const pConn = inComp.pConn;
    const rawMetadata = pConn.getRawMetadata();
    const contextTreeManager = PCore.getContextTreeManager();
    const contextName = pConn.getContextName();
    const pageReference = pConn.getPageReference();
    const index = pConn.index;
    const componentType = rawMetadata?.type;

    if (Object.hasOwn(rawMetadata?.config ?? {}, "value") && componentType !== "Address") {
        contextTreeManager.removeFieldNode(
            contextName,
            pageReference,
            pConn.viewName || "",
            trimAnnotation(pConn.getPropertyName()),
            index
        );
    } else if (componentType === "Address" && rawMetadata?.config?.associatedView) {
        // remove address node and its children
        contextTreeManager.removeViewNode(
            contextName,
            pageReference,
            trimAnnotation(rawMetadata.config.associatedView),
            index
        );
    } else {
        // remove view node and its children
        const registeredView = hasRegisteredViewNode(pConn);
        const pageRef = !registeredView && rawMetadata?.config?.context
            ? `${pageReference}${rawMetadata.config.context}`
            : pageReference;
        const viewName = registeredView
            ? pConn.viewName
            : rawMetadata?.config?.name || rawMetadata?.config?.id || "";
        const visibility = pConn.options?.visibility
            ?? rawMetadata?.config?.visibility
            ?? rawMetadata?.config?.referenceVisibility;
        contextTreeManager.removeViewNode(
            contextName,
            pageRef,
            viewName,
            index,
            { visibility }
        );
    }
}
