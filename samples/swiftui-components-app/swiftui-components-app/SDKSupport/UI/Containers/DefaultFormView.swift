import ConstellationSdk
import SwiftUI

struct DefaultFormView: View {
    @ObservedObject var state: ObservableComponent<DefaultFormComponent>

    init(_ component: DefaultFormComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            if !state.component.instructions.stripHTML.isEmpty {
                Text(state.component.instructions.stripHTML)
            }
            ForEach(state.component.children, id: \.context.id) { child in
                child.renderView()
            }
        }
    }
}

extension String {
    fileprivate var stripHTML: String {
        (try? NSAttributedString(
            data: Data(self.utf8),
            options: [
                .documentType: NSAttributedString.DocumentType.html,
                .characterEncoding: String.Encoding.utf8.rawValue
            ],
            documentAttributes: nil
        ))?.string ?? ""
    }
}
