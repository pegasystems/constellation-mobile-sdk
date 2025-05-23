import Foundation
import WebKit
import OSLog

class FormHandler: NSObject, WKScriptMessageHandler {
    weak var manager: ComponentManager?
    private let continuation = DeferedContinuation<CaseProcessingResult>()

    init(
        manager: ComponentManager
    ) {
        self.manager = manager
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard 
            let array = message.body as? [Any],
            let type = array[0] as? String
        else {
            Logger.current().error("Can not decode message")
            return
        }
        switch type {
        case "updateComponent": handleUpdateComponent(array)
        case "addComponent": handleAddComponent(array)
        case "removeComponent": handleRemoveComponent(array)
        case "ready": handleFormReady()
        case "finished": handleFormFinished(array)
        case "cancelled": handleFormCancel()
        case "error": handleFormError(array)
        default:
            Logger.current().error("Unexpected message type: \(type)")
        }
    }

    func processingResult() async -> CaseProcessingResult {
        await continuation.result()
    }

    private func handleUpdateComponent(_ input: [Any]) {
        if
            let cId = input.componentId,
            let props = input[2] as? String {
            manager?.updateComponent(cId, props)
        } else {
            Logger.current().error("Unexpected parameters types in updateComponent")
        }
    }

    private func handleAddComponent(_ input: [Any]) {
        guard let cId = input.componentId, let cType = input[2] as? String else {
            Logger.current().error("Unexpected input for addComponent.")
            return
        }
        manager?.addComponent(cId, type: cType)
    }

    private func handleRemoveComponent(_ input: [Any]) {
        guard let cId = input.componentId  else {
            Logger.current().error("Unexpected input for removeComponent.")
            return
        }
        manager?.removeComponent(cId)
    }

    private func handleFormReady() {
        Logger.current().debug("Form ready.")
    }

    private func handleFormFinished(_ input: [Any]) {
        Logger.current().debug("Form finished.")
        continuation.proceed(.finished(input[1] as? String))
    }

    private func handleFormCancel() {
        Logger.current().debug("Form cancelled.")
        continuation.proceed(.cancelled)
    }

    private func handleFormError(_ input: [Any]) {
        let errorMessage = input[1] as? String ?? "Unexpected."
        Logger.current().debug("Form encountered an error: \(errorMessage)")
        continuation.proceed(.error(errorMessage))
    }
}

extension Array where Element == Any {
    fileprivate var componentId: String? {
        if let intId = self[1] as? Int {
            "\(intId)"
        } else if let stringId = self[1] as? String {
            stringId
        } else {
            nil
        }
    }
}
