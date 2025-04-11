import SwiftUI

struct DropdownView: View {
    
    @ObservedObject var properties: DropdownProps
    
    init(properties: DropdownProps) {
        self.properties = properties
    }
    
    func pickerOptions() -> some View {
        ForEach(properties.options, id: \.self) { option in
            if let key = option["key"], let value = option["value"] {
                Text(key).tag(value)
            }
        }
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                if let label = properties.label {
                    Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                }
                if properties.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }
            
            Picker("Select an option", selection: properties.selectedValue) {
                pickerOptions()
            }
            .pickerStyle(MenuPickerStyle())
            .frame(maxWidth: .infinity)
            .padding()
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
