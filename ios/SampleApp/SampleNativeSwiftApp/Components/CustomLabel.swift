//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI
import ConstellationSDK

// not yet migrated
struct CustomLabel: View {
    
    @ObservedObject var properties: LabelProps
    
    init(properties: LabelProps) {
        self.properties = properties
    }
    
    var body: some View {
        Text(properties.text)
            .font(.system(size: 21, weight: .semibold, design: .rounded))
            .foregroundColor(.black)
            .padding()
            .frame(maxWidth: .infinity)
    }
}

class CustomLabelComponentProvider: LabelComponentProvider {
    
    let properties = LabelProps()
    let hostingController: UIHostingController<AnyView>
    
    init() {
        let view = AnyView(CustomLabel(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
