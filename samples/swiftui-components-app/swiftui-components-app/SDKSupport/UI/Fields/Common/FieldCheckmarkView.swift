import SwiftUI

struct FieldCheckmarkView: View {
    var validateMessage: String
    var value: String

    var body: some View {
        let isValid = validateMessage.isEmpty
        let hasValue = !value.isEmpty
        let showCheckmark = isValid && hasValue
        let showError = !isValid
        if showError || showCheckmark {
            Image(systemName: showCheckmark ? "checkmark" : "exclamationmark.triangle.fill")
                .resizable()
                .frame(width: 20, height: 20)
                .foregroundStyle(showCheckmark ? Color.green : Color.red)
        }
    }
}
