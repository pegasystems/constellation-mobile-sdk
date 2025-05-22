import Combine
import OSLog
import SwiftUI

struct PhoneNumberView: View {
    @ObservedObject var properties: PhoneNumberProps

    @State var presentSheet = false
    @FocusState var isFocused: Bool

    init(properties: PhoneNumberProps) {
        self.properties = properties
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                Text(properties.label)
                    .foregroundStyle(Color.black)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                if properties.required {
                    Text("*").foregroundColor(.red).fontWeight(.semibold)
                }
            }
            HStack {
                if properties.showCountryCode {
                    Button {
                        presentSheet = true
                        isFocused = false
                    } label: {
                        Text("\(properties.country.flag) \(properties.country.dial_code)")
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
                    text: $properties.domesticNumber,
                    prompt: Text(properties.placeholder ?? "")
                        .foregroundStyle(Color.gray).fontWeight(.light),
                    label: {
                        Text(properties.domesticNumber)
                            .foregroundStyle(Color.black).fontWeight(.semibold)
                    }
                )
                .focused($isFocused)
                .keyboardType(.phonePad)
                .onChange(of: properties.domesticNumber) {
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
                CountryCodeSelector(presentSheet: $presentSheet, selectedCountry: $properties.country)
            }
            if let message = properties.validateMessage ?? properties.helperText {
                Text(message)
                    .font(.system(size: 12, weight: .light, design: .rounded))
                    .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                    .padding(.leading, 4)
            }
        }
        .onTapGesture {
            hideKeyboard()
        }
        .disabled(properties.disabled || properties.readOnly)
        .opacity(properties.disabled ? 0.5 : 1)
        .onChange(of: isFocused) { _, newValue in
            // notify properties of focus change
            properties.isFocused = newValue
        }
    }

    func onDomesticNumberChange() {
        var pureNumber = properties.domesticNumber.replacingOccurrences(
            of: "[^0-9]",
            with: "",
            options: .regularExpression
        )
        if pureNumber.count > properties.country.limit {
            pureNumber = String(pureNumber.prefix(properties.country.limit))
        }
        for index in 0 ..< properties.country.pattern.count {
            guard index < pureNumber.count else {
                break
            }
            let stringIndex = String.Index(utf16Offset: index, in: properties.country.pattern)
            let patternCharacter = properties.country.pattern[stringIndex]
            guard patternCharacter != "#" else { continue }
            pureNumber.insert(patternCharacter, at: stringIndex)
        }
        properties.domesticNumber = pureNumber
    }
}

extension View {
    fileprivate func hideKeyboard() {
        let resign = #selector(UIResponder.resignFirstResponder)
        UIApplication.shared.sendAction(resign, to: nil, from: nil, for: nil)
    }
}
