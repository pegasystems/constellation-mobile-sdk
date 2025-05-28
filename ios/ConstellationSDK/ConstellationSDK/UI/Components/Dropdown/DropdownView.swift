import SwiftUI

struct DropdownView: View {
    
    @ObservedObject var properties: DropdownProps
    
    init(properties: DropdownProps) {
        self.properties = properties
    }
    
    func pickerOptions() -> [PickerOption] {
        properties.options.compactMap { option in
            if let key = option["key"], let label = option["label"] {
                return PickerOption(key: key, label: label)
            }
            return nil
        }
    }
    
    struct PickerOption: Hashable {
        let key: String
        let label: String
    }
    
    var selectedOption: PickerOption? {
        pickerOptions().first(where: { $0.key == properties.selectedValue.wrappedValue })
    }

    var body: some View {
        VStack {
            if properties.visible {
                if properties.readOnly {
                    readOnlyContentView
                } else {
                    contentView
                }
            }
        }
        .animation(.easeInOut, value: properties.visible)
    }
    
    private var readOnlyContentView: some View {
        // READ-ONLY VIEW
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                if let label = properties.label {
                    Text(label)
                        .foregroundColor(.black)
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                }
                Spacer()
                Text(readOnlyDisplayValue)
                    .foregroundColor(.gray)
                    .font(.system(size: 16, weight: .regular, design: .rounded))
                
            }
            if (properties.label == "Data Package") {
                Divider()
                    .frame(height: 0.5)
                    .background(Color.gray.opacity(0.2))
                    .padding(.leading, 8)
                HStack {
                    Text("Validity")
                        .foregroundColor(.black)
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                    Spacer()
                    Text(validity(plan: readOnlyDisplayValue))
                        .foregroundColor(.gray)
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                }
            }
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 8)
        .padding(.vertical, 5)
        .padding(.horizontal, 10)
        .background(Color.white)
        .cornerRadius(10)
    }
    
    private func validity(plan: String) -> String {
        if plan == "2 GB" {
            return "7 days"
        } else if plan == "10 GB" {
            return "30 days"
        } else if plan == "50 GB" {
            return "30 days"
        } else {
            return "Unlimited"
        }
    }
    
    private var readOnlyDisplayValue: String {
            if let selected = selectedOption {
                return selected.label
            }
            if let placeholder = properties.placeholder {
                return placeholder
            }
            return ""
        }

    private var contentView: some View {
        VStack(alignment: .leading, spacing: 5) {
            // Label & required
            HStack {
                let labelColor = Color(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.6))
                if let label = properties.label {
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
            
            // Custom dropdown
            Menu {
                ForEach(pickerOptions(), id: \.self) { option in
                    Button(action: {
                        properties.selectedValue.wrappedValue = option.key
                    }) {
                        Text(option.label)
                    }
                }
            } label: {
                HStack {
                    if let selected = selectedOption {
                        Text(selected.label)
                            .foregroundColor(.black)
                    } else if let placeholder = properties.placeholder {
                        Text(placeholder)
                            .foregroundColor(.gray)
                    } else {
                        Text("Select an option")
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    Image(systemName: "chevron.down")
                        .foregroundColor(.gray)
                        .imageScale(.medium)
                }
                .frame(minHeight: 44)
                .padding(.horizontal, 10)
                .padding(.vertical, 8)
                .background(Color.white)
                .cornerRadius(10)
            }
            
            if let message = properties.validateMessage ?? properties.helperText {
                let labelColor = Color(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.6))
                Text(message)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                    .foregroundColor(properties.validateMessage != nil ? .red : labelColor)
                    .padding(.leading, 4)
                    .fixedSize(horizontal: false, vertical: true) // <-- Add this
                    .multilineTextAlignment(.leading)             // <-- Optional: aligns multi-line text to the leading edge
                    .lineLimit(nil)
            
            }
        }
        .opacity(properties.disabled ? 0.5 : 1)
        .observe(properties: properties)
    }
}
