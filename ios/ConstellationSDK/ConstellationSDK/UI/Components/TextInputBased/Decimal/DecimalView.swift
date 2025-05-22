import SwiftUI

struct DecimalView: View {
    
    @ObservedObject var properties: DecimalProps
    @FocusState private var isFocused: Bool
    
    init(properties: DecimalProps) {
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
                TextField(
                    text: $properties.value,
                    prompt: Text(properties.placeholder ?? "")
                        .foregroundStyle(Color.gray).fontWeight(.light),
                    label: {
                        Text(properties.value)
                            .foregroundStyle(Color.black).fontWeight(.semibold)
                    }
                )
                .keyboardType(properties.decimalPrecision == 0 ? .numberPad : .decimalPad)
                .disabled(properties.disabled || properties.readOnly)
                .focused($isFocused)
                .onChange(of: properties.value) { _, newValue in
                    properties.value = newValue.formattedToDecimalPlaces(properties.decimalPrecision)
                }
                
                let isValid = properties.validateMessage?.isEmpty ?? true
                let hasValue = !properties.value.isEmpty
                let showCheckmark = isValid && hasValue
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
                    .padding(.bottom, 4)
            }
        }
        .opacity(properties.disabled ? 0.5 : 1)
        .observe(properties: properties, isFocused: _isFocused)
    }
}
