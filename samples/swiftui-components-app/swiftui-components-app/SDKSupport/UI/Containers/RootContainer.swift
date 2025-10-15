import ConstellationSdk
import SwiftUI

struct RootContainer: View {
    @ObservedObject var state: ObservableComponent<RootContainerComponent>
    
    init(_ component: RootContainerComponent) {
        state = ObservableComponent(component: component)
    }
    
    var body: some View {
        if let container = state.component.viewContainer {
            container.renderView()
                .dialog(
                    config: {
                        state.component.dialogConfig
                    },
                    onDismiss: {
                        state.component.dismissDialog()
                    }
                )
        }
    }
}
