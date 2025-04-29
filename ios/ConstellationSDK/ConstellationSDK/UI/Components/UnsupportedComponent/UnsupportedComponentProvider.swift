//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI
import Combine

public class UnsupportedComponentProvider: ComponentProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    public var view: AnyView

    public var properties: UnsupportedComponentProps

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
        properties = .init()
        view = AnyView(
            UnsupportedComponentView(properties: properties)
        )
    }

    public func updateProperties(_ jsonInput: String) throws {
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
