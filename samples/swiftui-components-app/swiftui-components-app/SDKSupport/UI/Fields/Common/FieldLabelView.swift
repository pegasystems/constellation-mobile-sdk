import SwiftUI

struct FieldLabelView: View {
    var label: String
    var required: Bool

    var body: some View {
        HStack {
            if !label.isEmpty {
                Text(label)
                    .foregroundStyle(Color.black)
                    .font(.system(size: 12, weight: .light, design: .rounded))
            }
            if required {
                Text("*").foregroundColor(.red).fontWeight(.semibold)
            }
        }
    }
}
