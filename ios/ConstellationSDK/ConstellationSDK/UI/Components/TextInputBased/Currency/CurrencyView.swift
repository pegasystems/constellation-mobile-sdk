import SwiftUI

struct CurrencyView: View {

    @ObservedObject var properties: CurrencyProps
    @FocusState private var isFocused: Bool

    init(properties: CurrencyProps) {
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
            if properties.readOnly {
                // READ-ONLY VIEW
                HStack {
                    if let label = properties.label, !properties.hideLabel {
                        Text(label)
                            .foregroundColor(.black)
                            .font(.system(size: 16, weight: .regular, design: .rounded))
                    }
                    Spacer()
                    Text(readOnlyDisplayValue)
                        .foregroundColor(.gray)
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                }
                .padding(.vertical, 10)
                .padding(.horizontal, 8)
            } else {
                // EDITABLE VIEW (original)
                HStack {
                    if let label = properties.label, !properties.hideLabel {
                        let labelColor = Color(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.6))
                        Text("    " + label)
                            .foregroundStyle(labelColor)
                            .font(.system(size: 12, weight: .light, design: .rounded))
                    }
                }
                HStack {
                    if properties.showISOCode {
                        Text(properties.currencyISOCode)
                            .foregroundStyle(Color.gray)
                            .fontWeight(.bold)
                    }
                    TextField(
                        text: $properties.value,
                        prompt: Text(properties.placeholder ?? "")
                            .foregroundStyle(Color.gray)
                            .fontWeight(.light),
                        label: {
                            Text(properties.value)
                                .foregroundStyle(Color.black)
                                .fontWeight(.semibold)
                        }
                    )
                    .keyboardType(properties.decimalPrecision == 0 ? .numberPad : .decimalPad)
                    .disabled(properties.disabled || properties.readOnly)
                    .focused($isFocused)
                    .onChange(of: properties.value) { _, newValue in
                        properties.value = newValue.formattedToDecimalPlaces(properties.decimalPrecision)
                    }
                    let isValid = properties.validateMessage?.isEmpty ?? true
                    let showError = !isValid
                    if showError {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .resizable()
                            .frame(width: 20, height: 20)
                            .foregroundStyle(Color.red)
                    }
                }
                .padding()
                //.background(Color.white) // Remove here, move to container
                //.clipShape(RoundedRectangle(cornerSize: CGSize(width: 10, height: 10)))
                if let message = properties.validateMessage ?? properties.helperText {
                    Text(message)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                        .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                        .padding(.leading, 4)
                        .padding(.bottom, 4)
                        .fixedSize(horizontal: false, vertical: true)
                        .multilineTextAlignment(.leading)
                }
            }
        }
        .padding(.vertical, 5)
        .padding(.horizontal, 10)
        .background(Color.white)
        .cornerRadius(10)
        .opacity(properties.disabled ? 0.5 : 1)
        .observe(properties: properties, isFocused: _isFocused)
    }

    private var readOnlyDisplayValue: String {
        var result = properties.value
        if properties.currencyISOCode == "USD" && !result.isEmpty {
            result += " $"
        }
        return result
    }
}
