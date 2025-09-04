import Foundation
import SwiftUI
import Combine

public protocol ComponentProvider  {

    var eventSubject: AnyPublisher<ComponentEvent, Never> { get }

    var view: AnyView { get }

    init()
    func updateProperties(_ jsonInput: String) throws
}

protocol ContainerProvider: ComponentProvider {
    func useManager(_ manager: ComponentManager)
}
