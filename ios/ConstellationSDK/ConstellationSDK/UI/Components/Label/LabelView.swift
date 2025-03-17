//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI

struct LabelView: View {
    
    @ObservedObject var properties: LabelProps
    
    public init(properties: LabelProps) {
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
