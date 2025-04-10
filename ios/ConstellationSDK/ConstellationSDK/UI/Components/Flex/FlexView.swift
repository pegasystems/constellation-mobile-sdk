import SwiftUI
import UIKit

struct FlexView: View {
    
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
