import { Utils } from "../../helpers/utils.js";
import { ContainerBaseComponent } from "./container-base.component.js";

const options = { context: "app" };
const TAG = "[RootContainerComponent]";
const VIEW_CONTAINER = "ViewContainer";
const MODAL_VIEW_CONTAINER = "ModalViewContainer";

export class RootContainerComponent extends ContainerBaseComponent {
    props = {
        httpMessages: {},
        children: [],
    };

    init() {
        const { containers } = PCore.getStore().getState();
        const items = Object.keys(containers).filter((item) => item.includes("root"));
        PCore.getContainerUtils().getContainerAPI().addContainerItems(items);
        Utils.setHasViewContainer("false");
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.checkAndUpdate();
    }

    #sendPropsUpdate() {
        const httpMessages = this.jsComponentPConnectData.httpMessages || [];
        this.props = {
            httpMessages: httpMessages,
            children: this.getChildrenProps()
        };
        this.componentsManager.onComponentPropsUpdate(this);

        // even if the http issue no longer exists the error is persisted in core js so we need to clear it
        if (this.jsComponentPConnectData.httpMessages && this.jsComponentPConnectData.httpMessages.length > 0) {
            this.#clearHttpMessages();
        }
    }

    #clearHttpMessages() {
        const context = PCore.getContainerUtils().getActiveContainerItemName(
            `${PCore.getConstants().APP.APP}/${this.pConn.getContainerName()}`
        );
        PCore.getMessageManager().clearMessages({
            category: "HTTP",
            type: "error",
            context: context,
        });
    }

    updateSelf() {
        this.#configureModalContainer();
        const { renderingMode } = this.jsComponentPConnect.getCurrentCompleteProps(this);
        if (renderingMode === "noPortal") {
            this.#generateViewContainerForNoPortal();
        } else {
            console.error(TAG, "'noPortal' rendering mode supported only.");
        }
        if (this.compId !== "1") {
            console.error(TAG, "RootComponent id must be '1' to match root container on consumer side");
            return;
        }
        this.#sendPropsUpdate();
    }

    #generateViewContainerForNoPortal() {
        const arChildren = this.pConn.getChildren();
        if (
            !arChildren ||
            arChildren.length !== 1 ||
            arChildren[0].getPConnect().getComponentName() !== VIEW_CONTAINER
        ) {
            console.error(TAG, "Only ViewContainer in RootContainer supported for 'noPortal' mode.");
            return;
        }

        const configProps = this.pConn.getConfigProps();
        const viewContConfig = {
            meta: {
                type: VIEW_CONTAINER,
                config: configProps,
            },
            options,
        };
        const viewContainerPConn = PCore.createPConnect(viewContConfig).getPConnect();
        this.#updateOrCreateChildComponent(VIEW_CONTAINER, viewContainerPConn);
    }

    #configureModalContainer() {
        const configObjModal = PCore.createPConnect({
            meta: {
                type: MODAL_VIEW_CONTAINER,
                config: {
                    name: 'modal'
                }
            },
            options
        });

        const modalViewContainerPConn = configObjModal.getPConnect();
        this.#updateOrCreateChildComponent(MODAL_VIEW_CONTAINER, modalViewContainerPConn);
    }

    #updateOrCreateChildComponent(type, pConn) {
        let component = this.childrenComponents.find((component) => component.type === type);
        if (component) {
            component.update(pConn);
        } else {
            component = this.componentsManager.create(pConn.meta.type, [pConn]);
            // must add to childrenComponents before init to avoid re-entry loops
            this.childrenComponents.push(component);
            component.init();
        }
    }
}
