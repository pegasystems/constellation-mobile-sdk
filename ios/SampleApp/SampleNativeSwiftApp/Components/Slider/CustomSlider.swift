import ConstellationSDK
import Combine
import SwiftUI

class CustomSliderProvider: ComponentProvider {
    var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    var view: AnyView

    let properties: SliderProps

    required init() {
        properties = SliderProps()

        eventSubject = properties.$sliderValue.map {
            ComponentEvent(
                type: .fieldChangeWithFocus,
                componentData: .init(value: String(Int($0 * 100))),
                eventData: .init(focused: false))
        }.eraseToAnyPublisher()

        view = AnyView(SliderView(properties: properties))
    }

    func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableSliderProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct SliderView: View {
    @State var properties: SliderProps
    @FocusState var isFocused: Bool

    init(properties: SliderProps) {
        self.properties = properties
    }

    var body: some View {
        VStack {
            if properties.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: properties.visible)
    }

    private var contentView: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                if let label = properties.label {
                    Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                }
                if properties.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }

            HStack {
                Slider(value: $properties.sliderValue)
                .disabled(properties.disabled || properties.readOnly)
            }
            .padding()
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerSize: CGSize(
                width: 10,
                height: 10
            )))
            .overlay {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(Color.gray, lineWidth: 3)
            }
        }
    }

}
