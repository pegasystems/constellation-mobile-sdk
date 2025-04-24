import Combine
import SwiftUI

class RootContainerComponentProvider: ContainerProvider {
    var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    lazy var view: AnyView = {
        AnyView(RootContainerComponentView(properties: properties, manager: manager))
    }()
    
    let properties = RootContainerComponentProps()
    
    private weak var manager: ComponentManager?
    
    required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }
    
    func presentAlert(message: String, onClose: @escaping () -> Void) {
        properties.alertInfo = AlertInfo(
            message: message,
            type: .alert,
            onClose: onClose)
    }

    func injectView(_ view: UIView) {
        properties.view = AnyView(WrappedView(view))
    }

    func presentConfirm(message: String, onResult: @escaping (Bool) -> Void) {
        properties.alertInfo = AlertInfo(
            message: message,
            type: .confirm,
            onConfirm: onResult)
    }
    
    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }
    
    func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableRootContainerComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct RootContainerComponentView: View {
    
    @ObservedObject var properties: RootContainerComponentProps
    weak var manager: ComponentManager?

    init (properties: RootContainerComponentProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }

    var body: some View {
        VStack {
            if let injectedView = properties.view {
                injectedView.frame(height: 1)
            }
            if let viewContainerId = properties.viewContainer?.stringId {
                manager?.view(for: viewContainerId)
            } else {
                ProgressView()
            }
        }
        .alert(self.properties.alertInfo?.title ?? "", isPresented: showAlert) {
            alertButtons
        } message: {
            let message = properties.alertInfo?.message ?? "Unknown error"
            return Text(message)
        }
    }
    
    private var showAlert: Binding<Bool> {
        Binding(
            get: { properties.alertInfo != nil },
            set: { if !$0 { properties.alertInfo = nil } }
        )
    }
    
    @ViewBuilder
    private var alertButtons: some View {
        if let alert = properties.alertInfo {
            switch alert.type {
            case .alert:
                Button("OK", role: .cancel) {
                    alert.onClose?()
                    properties.alertInfo = nil
                }
            case .confirm:
                Button("OK", role: .destructive) {
                    alert.onConfirm?(true)
                    properties.alertInfo = nil
                }
                Button("Cancel", role: .cancel) {
                    alert.onConfirm?(false)
                    properties.alertInfo = nil
                }
            }
        }
    }
}

fileprivate struct WrappedView: UIViewRepresentable {
    private let storedView: UIView

    init(_ view: UIView) {
        storedView = view
    }

    func makeUIView(context: Context) -> some UIView {
        storedView
    }

    func updateUIView(_ uiView: UIViewType, context: Context) {
        //no-op
    }
}
