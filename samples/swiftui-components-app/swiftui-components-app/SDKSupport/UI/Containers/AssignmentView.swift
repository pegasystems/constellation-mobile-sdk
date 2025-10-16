import ConstellationSdk
import SwiftUI

struct AssignmentView: View {
    @ObservedObject var state: ObservableComponent<AssignmentComponent>
    
    init(_ component: AssignmentComponent) {
        state = ObservableComponent(component: component)
    }
    
    var body: some View {
        ZStack {
            ForEach(state.component.children, id: \.context.id) { child in
                child.renderView()
            }
            if state.component.loading {
                ProgressView()
            }
        }
    }
}
