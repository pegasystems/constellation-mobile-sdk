import ConstellationSDK
import SwiftUI

public class SliderProps : ObservableObject, ComponentProps {
    @Published public var label: String?
    @Published public var value: String = ""
    @Published public var visible: Bool = true
    @Published public var required = false
    @Published public var disabled = false
    @Published public var readOnly = false
    @Published var sliderValue: Float = 0.0
}

struct DecodableSliderProps: Decodable {
    let value: String
    let label: String?
    let visible: Bool
    let required: Bool
    let disabled: Bool
    let readOnly: Bool

    func apply(to observableProps: SliderProps) {
        observableProps.sliderValue = if let floatValue = Float(value) {
            floatValue / 100.0
        } else {
            0
        }
        observableProps.label = label
        observableProps.required = required
        observableProps.disabled = disabled
        observableProps.readOnly = readOnly
    }
}
