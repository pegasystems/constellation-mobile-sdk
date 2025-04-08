//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI
import Combine

class UnsupportedComponentProvider: ComponentProvider {
    var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    var view: AnyView

    var properties: UnsupportedComponentProps

    required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
        properties = .init()
        view = AnyView(
            UnsupportedComponentView(properties: properties)
        )
    }

    func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableUnsupportedComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct UnsupportedComponentView: View {
    @ObservedObject var properties: UnsupportedComponentProps

    init(properties: UnsupportedComponentProps) {
        self.properties = properties
    }

    var body: some View {
        HStack(spacing: 10) {
            Text("Component not supported: <\(properties.type)>").padding()
        }
        .background(Color(red: 0.6, green: 0.7, blue: 0.9))
        .cornerRadius(10)
    }
}
