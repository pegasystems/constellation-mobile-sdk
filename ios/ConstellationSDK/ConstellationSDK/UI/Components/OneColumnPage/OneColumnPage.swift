//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI

struct OneColumnPage: View {
    
    @ObservedObject var properties: OneColumnPageProps
    
    init(properties: OneColumnPageProps) {
        self.properties = properties
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                contentViews
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(20)
            .background(Color(red: 0.8, green: 0.85, blue: 0.9))
            .cornerRadius(10)
        }
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
