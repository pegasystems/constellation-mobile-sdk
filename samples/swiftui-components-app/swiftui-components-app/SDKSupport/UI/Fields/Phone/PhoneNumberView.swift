import Combine
import ConstellationSdk
import SwiftUI

struct PhoneNumberView: View {
    @ObservedObject var state: ObservableComponent<PhoneComponent>

    @State var presentSheet = false
    @FocusState var isFocused: Bool

    @State var country: CountryData
    @State var domesticNumber: String

    init(_ component: PhoneComponent) {
        state = ObservableComponent(component: component)

        country = .default
        domesticNumber = ""

        if component.showCountryCode {
            let parsedNumber = PhoneParser.parse(component.value)
            country = parsedNumber.country
            domesticNumber = parsedNumber.number
        } else {
            domesticNumber = component.value
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                Text(state.component.label)
                    .foregroundStyle(Color.black)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                if state.component.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }
            HStack {
                if state.component.showCountryCode {
                    Button {
                        presentSheet = true
                        isFocused = false
                    } label: {
                        Text("\(country.flag) \(country.dial_code)")
                            .padding(10)
                            .frame(minWidth: 80, minHeight: 47)
                            .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                            .foregroundColor(.black)
                    }
                    .overlay {
                        RoundedRectangle(cornerRadius: 10)
                            .strokeBorder(isFocused ? Color.blue : Color.gray, lineWidth: 3)
                    }
                }

                TextField(
                    text: $domesticNumber,
                    prompt: Text(state.component.placeholder)
                        .foregroundStyle(Color.gray).fontWeight(.light),
                    label: {
                        Text(domesticNumber)
                            .foregroundStyle(Color.black).fontWeight(.semibold)
                    }
                )
                .focused($isFocused)
                .keyboardType(.phonePad)
                .onChange(of: domesticNumber) {
                    onDomesticNumberChange()
                }
                .padding(10)
                .frame(minWidth: 80, minHeight: 47)
                .background(
                    .white,
                    in: RoundedRectangle(cornerRadius: 10, style: .continuous)
                )
                .overlay {
                    RoundedRectangle(cornerRadius: 10)
                        .strokeBorder(isFocused ? Color.blue : Color.gray, lineWidth: 3)
                }
            }
            .sheet(isPresented: $presentSheet) {
                CountryCodeSelector(presentSheet: $presentSheet, selectedCountry: $country)
            }
            let message = if state.component.validateMessage.isEmpty {
                state.component.helperText
            } else {
                state.component.validateMessage
            }
            if !message.isEmpty {
                Text(message)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                    .foregroundColor(state.component.validateMessage.isEmpty ? .gray : .red)
                    .padding(.leading, 4)
            }
        }
        .onTapGesture {
            hideKeyboard()
        }
        .disabled(state.component.disabled || state.component.readOnly)
        .onChange(of: isFocused) { _, newValue in
            state.component.updateFocus(focused: newValue)
        }
    }

    func onDomesticNumberChange() {
        var pureNumber = domesticNumber.replacingOccurrences(
            of: "[^0-9]",
            with: "",
            options: .regularExpression
        )
        if pureNumber.count > country.limit {
            pureNumber = String(pureNumber.prefix(country.limit))
        }
        for index in 0 ..< country.pattern.count {
            guard index < pureNumber.count else {
                break
            }
            let stringIndex = String.Index(utf16Offset: index, in: country.pattern)
            let patternCharacter = country.pattern[stringIndex]
            guard patternCharacter != "#" else { continue }
            pureNumber.insert(patternCharacter, at: stringIndex)
        }
        domesticNumber = pureNumber

        let cleanedNumber = domesticNumber.replacingOccurrences(of: " ", with: "")
        if state.component.showCountryCode {
            state.component.updateValue(value: country.dial_code + cleanedNumber)
        } else {
            state.component.updateValue(value: cleanedNumber)
        }
    }
}

extension View {
    fileprivate func hideKeyboard() {
        let resign = #selector(UIResponder.resignFirstResponder)
        UIApplication.shared.sendAction(resign, to: nil, from: nil, for: nil)
    }
}
