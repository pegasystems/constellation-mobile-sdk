import SwiftUI

struct RadioButtonsView: View {
    
    @ObservedObject var properties: RadioButtonsProps
    
    init(properties: RadioButtonsProps) {
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
                if let label = properties.label {
                    Text(label)
                        .foregroundStyle(Color.black)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                }
                if properties.required {
                    Text("*")
                        .foregroundColor(.red)
                        .fontWeight(.semibold)
                }
            }
            
            VStack(alignment: .leading, spacing: 12) {
                ForEach(properties.options, id: \.self) { option in
                    if let key = option["key"], let label = option["label"] {
                        HStack {
                            Button(action: {
                                properties.selectedValue.wrappedValue = key
                            }) {
                                HStack {
                                    Image(systemName: properties.selectedValue.wrappedValue == key ? "largecircle.fill.circle" : "circle")
                                        .foregroundColor(.blue)
                                    Text(label)
                                        .foregroundColor(.black)
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                            Spacer()
                        }
                    }
                }
            }
            .padding(.vertical, 5)
            .padding(.horizontal, 10)
            .background(Color.white)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.gray, lineWidth: 2)
            )
            
            if let message = properties.validateMessage ?? properties.helperText {
                Text(message)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                    .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                    .padding(.leading, 4)
            }
        }
        .opacity(properties.disabled ? 0.5 : 1)
        .observe(properties: properties)
    }
}
