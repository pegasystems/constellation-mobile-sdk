//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Combine
import Foundation
import SwiftUI

protocol FlexPropsProtocol : ComponentProps {
    var children: [UIView] { get set }
    var direction: String { get set }
}

public class FlexProps : ObservableObject, FlexPropsProtocol {
    public init() {} // in order to allow creating new instances from the host app context.
    
    @Published public var children: [UIView] = []
    @Published public var direction: String = "column"
}
