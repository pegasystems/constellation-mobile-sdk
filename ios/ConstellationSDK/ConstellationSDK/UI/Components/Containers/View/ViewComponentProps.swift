//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Combine
import SwiftUI

class ViewComponentProps : ObservableObject, ComponentProps {
    @Published var title: String? = nil
    @Published var showLabel: Bool = false
    @Published var label: String = ""
    @Published var instructions: String? = nil
    @Published var children: [ViewID] = []
    @Published var loading: Bool = true
    @Published var visible: Bool = true
}

struct DecodableViewComponentProps: Decodable {
    let children: [String]
    let title: String?
    let instructions: String?
    let showLabel: Bool?
    let label: String?
    let visible: Bool?
    let loading: Bool?

    func apply(to observableProps: ViewComponentProps) {
        observableProps.children = children.map {
            ViewID(stringId: $0)
        }
        observableProps.title = title
        observableProps.instructions = instructions
        observableProps.showLabel = showLabel ?? false
        observableProps.label = label ?? ""
        observableProps.visible = visible ?? true
        observableProps.loading = loading ?? false
    }
}
