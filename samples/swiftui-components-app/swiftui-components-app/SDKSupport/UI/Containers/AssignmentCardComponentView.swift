import ConstellationSdk
import SwiftUI

struct AssignmentCardComponentView: View {
    @ObservedObject var state: ObservableComponent<AssignmentCardComponent>

    init(_ component: AssignmentCardComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            ScrollView {
                VStack(spacing: 20) {
                    VStack {
                        if state.component.loading {
                            ProgressView()
                        } else {
                            ForEach(state.component.children, id: \.context.id) { child in
                                child.renderView()
                            }
                        }
                    }
                }
                // Style taken from OneColumnPage
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(20)
                .background(Color(red: 0.8, green: 0.85, blue: 0.9))
                .cornerRadius(10)
            }
            if let buttons = state.component.actionButtons {
                buttons.renderView()
            }
        }
    }
}
