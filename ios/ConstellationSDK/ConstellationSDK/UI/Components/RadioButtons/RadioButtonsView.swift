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
            // Top label & required
            HStack {
                if let label = properties.label {
                    let labelColor = Color(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.6))
                    Text("    " + label)
                        .foregroundColor(labelColor)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                }
//                if properties.required {
//                    Text("*")
//                        .foregroundColor(.red)
//                        .fontWeight(.semibold)
//                }
            }
            
            // Radio options
            VStack(alignment: .leading, spacing: 0) {
                ForEach(Array(properties.options.enumerated()), id: \.element) { idx, option in
                    if let key = option["key"],
                       let label = option["label"] {
                        Button(action: {
                            properties.selectedValue.wrappedValue = key
                        }) {
                            HStack(alignment: .center, spacing: 12) {
                        
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(label)
                                        .foregroundColor(.black)
                                    let secondaryLabel = secondaryLabel(label: label)
                                        Text(secondaryLabel)
                                            .font(.system(size: 12))
                                            .foregroundColor(.gray)
                                }
                                Spacer()
                                if properties.selectedValue.wrappedValue == key {
                                    Image(systemName: "checkmark")
                                        .foregroundColor(.blue)
                                }
                            }
                            .contentShape(Rectangle())
                            .padding(.vertical, 10)
                        }
                        .buttonStyle(PlainButtonStyle())
                        
                        // Divider except after last item
                        if idx < properties.options.count - 1 {
                            Divider()
                                .frame(height: 0.5)
                                .background(Color.gray.opacity(0.2))
                                .padding(.leading, 8)
                        }
                    }
                }
            }
            .padding(.vertical, 5)
            .padding(.horizontal, 10)
            .background(Color.white)
            .cornerRadius(10)
            
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

private func secondaryLabel(label: String) -> String {
    if label == "2 GB" {
        return "Valid for: 7 days"
    } else if label == "10 GB" {
        return "Valid for: 30 days"
    } else if label == "50 GB" {
        return "Valid for: 30 days"
    } else {
        return "Valid for: 60 days"
    }
}
