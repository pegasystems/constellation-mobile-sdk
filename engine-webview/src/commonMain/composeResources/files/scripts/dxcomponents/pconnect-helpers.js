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

/**
 * Removes a component and its descendants from the context tree.
 * Implementation ported from CoreJS 25.1.4 without node visibility check
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
        const pageRef = rawMetadata?.config?.context
            ? `${pageReference}${rawMetadata.config.context}`
            : pageReference;
        const viewName = rawMetadata?.config?.name || rawMetadata?.config?.id || "";
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
