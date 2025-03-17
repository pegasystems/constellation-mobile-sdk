//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

extension String {
    var nilIfEmpty: String? {
        isEmpty ? nil : self
    }
}
