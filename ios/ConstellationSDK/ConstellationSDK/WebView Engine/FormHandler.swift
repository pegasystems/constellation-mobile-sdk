//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import WebKit
import OSLog

class FormHandler: NSObject, WKScriptMessageHandler {
    weak var manager: ComponentManager?
    private var resultHandler: CaseProcessingResultHandler

    init(
        manager: ComponentManager,
        resultHandler: @escaping CaseProcessingResultHandler
    ) {
        self.manager = manager
        self.resultHandler = resultHandler
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
        case "upadateComponentProps": handleUpdateComponent(array)
        case "addComponent": handleAddComponent(array)
        case "removeComponent": handleRemoveComponent(array)
        case "finished": handleFormFinished(array)
        case "cancelled": handleFormCancel()
        default:
            Logger.current().error("Unexpected message type: \(type)")
        }
    }

    private func handleUpdateComponent(_ input: [Any]) {
        if
            let cId = input.componentId,
            let props = input[2] as? String {
            manager?.upadateComponentProps(cId, props)
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

    private func handleFormFinished(_ input: [Any]) {
        Logger.current().debug("Form finished.")
        resultHandler(.finished(input[1] as? String))
    }

    private func handleFormCancel() {
        Logger.current().debug("Form cancelled.")
        resultHandler(.cancelled)
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
