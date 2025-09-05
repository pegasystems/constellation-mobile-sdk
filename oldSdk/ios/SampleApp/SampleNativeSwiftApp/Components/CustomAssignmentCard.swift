import Combine
import SwiftUI
import ConstellationSDK

import Foundation
struct CustomAssignmentCardComponentView: View {
    @ObservedObject var properties: AssignmentCardComponentProps
    weak var manager: ComponentManager?
    init (properties: AssignmentCardComponentProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }
    
    var body: some View {
        VStack {
            ScrollView {
                VStack(spacing: 20) {
                    VStack {
                        if properties.loading {
                            ProgressView()
                        } else {
                            ForEach(properties.children) {
                                manager?.view(for: $0.stringId)
                            }
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(20)
                .background(Color(red: 0.8, green: 0.85, blue: 0.9))
                .cornerRadius(10)
            }
            if let buttons = properties.actionButtons {
                manager?.view(for: buttons.stringId)
            }
        }
    }
}

class CustomAssignmentCardComponentProvider: AssignmentCardComponentProvider {
    required init() {
        super.init()
    }
    
    override var view: AnyView {
        get {
            return _view
        }
        set {
            _view = newValue
        }
    }
    
    private lazy var _view: AnyView = {
        return AnyView(CustomAssignmentCardComponentView(properties: properties, manager: manager))
    }()
}
