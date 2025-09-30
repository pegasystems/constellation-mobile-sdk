import SwiftUI

struct FieldMessageView: View {
    var helperText: String
    var validateMessage: String

    private var message: String {
        if validateMessage.isEmpty {
            helperText
        } else {
            validateMessage
        }
    }

    private var foregroundColor: Color {
        validateMessage.isEmpty ? .gray : .red
    }

    var body: some View {
        if !message.isEmpty {
            Text(message)
                .font(.system(size: 12, weight: .light, design: .rounded))
                .foregroundColor(foregroundColor)
                .padding(.leading, 4)
                .padding(.bottom, 4)
        }
    }
}
