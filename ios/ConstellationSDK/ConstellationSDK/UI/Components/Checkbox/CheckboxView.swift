import SwiftUI

struct CheckboxView: View {

    @ObservedObject var properties: CheckboxProps
    @FocusState private var isFocused: Bool
    
    init(properties: CheckboxProps) {
        self.properties = properties
    }
    
    var body: some View {
        VStack {
            if properties.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: properties.visible)
    }
    
    private var contentView: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                if let label = properties.label, !properties.hideLabel {
                    Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                }
                if properties.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }

            HStack {
                Toggle(isOn: $properties.value) {
                    Text(properties.caption)
                }
                .toggleStyle(.switch)
                .focused($isFocused)

                let isValid = properties.validateMessage?.isEmpty ?? true
                let showCheckmark = isValid
                let showError = !isValid
                if showError || showCheckmark {
                    Image(systemName: showCheckmark ? "checkmark" : "exclamationmark.triangle.fill")
                        .resizable()
                        .frame(width: 20, height: 20)
                        .foregroundStyle(showCheckmark ? Color.green : Color.red)
                }
            }
            .padding()
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerSize: CGSize(
                width: 10,
                height: 10
            )))
            .overlay {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(isFocused ? Color.blue : Color.gray, lineWidth: 3)
            }
            if let message = properties.validateMessage ?? properties.helperText {
                Text(message)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                    .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                    .padding(.leading, 4)
            }
        }
        .opacity(properties.disabled ? 0.5 : 1)
        .observe(properties: properties, isFocused: _isFocused)
    }
}
