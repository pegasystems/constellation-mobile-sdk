//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI

struct DateView: View {
    
    @ObservedObject var properties: DateProps
    
    init(properties: DateProps) {
        self.properties = properties
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            
            DatePicker(selection: $properties.selectedDate,
                       displayedComponents: [.date]) {
                HStack {
                    if let label = properties.label {
                        Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                    }
                    if properties.required {
                        Text("*").foregroundColor(.red).fontWeight(.semibold)
                    }
                }
                if let message = properties.validateMessage ?? properties.helperText {
                    Text(message)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                        .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                        .padding(.leading, 4)
                        .padding(.bottom, 4)
                }
            }
        }
        .observe(properties: properties)
    }
}
