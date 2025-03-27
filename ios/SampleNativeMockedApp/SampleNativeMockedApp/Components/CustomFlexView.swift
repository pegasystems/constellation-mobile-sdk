//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI
import ConstellationSDK

// not yet migrated
struct CustomFlexView: View {
    
    @ObservedObject var properties: FlexProps
    
    init(properties: FlexProps) {
        self.properties = properties
    }
    
    var body: some View {
        Group {
            if properties.direction == "column" {
                VStack(spacing: 10) {
                    contentViews
                }
            } else {
                HStack(spacing: 10) {
                    contentViews
                }
            }
        }
        .background(Color(red: 0.6, green: 0.7, blue: 0.9))
        .cornerRadius(10)
    }
    
    private var contentViews: some View {
        ForEach(properties.children.indices, id: \.self) { index in
            let child = properties.children[index]
            if let sdkView = child as? PMSDKWrapperView {
                sdkView.swiftUIView
            } else {
                let className = String(describing: type(of: child))
                unsupportedView(className: className)
            }
        }
    }
    
    private func unsupportedView(className: String) -> some View {
        HStack(spacing: 10) {
            Text("Component not supported: <\(className)>").padding()
        }
        .background(Color(red: 0.6, green: 0.7, blue: 0.9))
        .cornerRadius(10)
    }
}

class CustomFlexComponentProvider: FlexComponentProvider {
    
    let properties = FlexProps()
    let hostingController: UIHostingController<AnyView>
    
    init() {
        let view = AnyView(CustomFlexView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
