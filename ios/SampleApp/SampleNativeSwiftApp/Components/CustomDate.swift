import SwiftUI
import ConstellationSDK

// not yet migrated
struct CustomDateView: View {
    
    @ObservedObject var properties: DateProps
    
    init(properties: DateProps) {
        self.properties = properties
        self.formatter = DateFormatter()
        self.formatter.dateStyle = .long
    }
    
    private let formatter: DateFormatter
    
    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                if let label = properties.label, !properties.hideLabel {
                    Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                }
                if properties.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }
            
            DatePicker("Select a date", selection: properties.date, displayedComponents: .date)
                .datePickerStyle(GraphicalDatePickerStyle())
                .padding()
            Text("Selected date: \(properties.date.wrappedValue, formatter: formatter)")
                .font(.system(size: 12, weight: .light, design: .rounded))
        }
        .background(Color(red: 0.6, green: 0.7, blue: 0.9))
        .cornerRadius(10)
        .padding()
    }
}

class CustomDateComponentProvider: DateComponentProvider {
    
    let properties = DateProps()
    let hostingController: UIHostingController<AnyView>
    
    init() {
        let view = AnyView(CustomDateView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}

