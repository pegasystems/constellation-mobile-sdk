import ConstellationSdk
import SwiftUI

struct RootContainer: View {
    @ObservedObject var state: ObservableComponent<RootContainerComponent>
    @State private var promptValue: String = ""
    
    init(_ component: RootContainerComponent) {
        state = ObservableComponent(component: component)
    }
    
    var body: some View {
        if let container = state.component.viewContainer {
            container.renderView()
                .componentDialog(config: { state.component.dialogConfig },
                                 dismiss: { state.component.dismissDialog() }
                )
        }
    }
    
    private var presentDialog: Binding<Bool> {
        Binding(
            get: { state.component.dialogConfig != nil },
            set: { if !$0 { state.component.dismissDialog() } }
        )
    }
}
