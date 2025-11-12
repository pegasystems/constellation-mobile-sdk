import ConstellationSdk
import Foundation
import SwiftUI

/*
 * Provides user interface based on SDK state.
 * Currently either shows RootView (when ready) or ProgressView for other states.
 * This demo application presents form as modal sheet, so states like
 * "finished", "cancelled" or "error" shall be handled outside of this view
 * by dismissing enclosing modal presenter.
 */
struct StateView: View {
    @State var sdkState: SDKState = .initial
    private let wrapper: SDKWrapper

    init(wrapper: SDKWrapper) {
        self.wrapper = wrapper
    }

    var body: some View {
        Group {
            switch sdkState {
            case .ready(let root, let envInfo):
                root.renderView()
                    .environment(\.timeZone, envInfo.timeZoneObject)
                    .environment(\.locale, envInfo.localeObject)
            default: ProgressView()
            }
        }
        .padding()
        .onReceive(wrapper.state) { newState in
            sdkState = newState
        }
    }
}

extension EnvironmentInfo {
    var timeZoneObject: TimeZone {
        let timeZoneMinutesOffset = DateTimeComponent.Companion().getTimeZoneOffset(timeZone: timeZone)
        return TimeZone(secondsFromGMT: Int(timeZoneMinutesOffset)) ?? TimeZone(abbreviation: "UTC")!
    }

    var localeObject: Locale {
        Locale(identifier: locale)
    }
}
