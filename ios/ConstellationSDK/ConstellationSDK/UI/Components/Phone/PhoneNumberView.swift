//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import SwiftUI
import Combine

struct PhoneNumberView: View {
    
    @ObservedObject var properties: PhoneNumberProps
    
    @State var presentSheet = false
    @State var countryCode : String = "+1"
    @State var countryFlag : String = "🇺🇸"
    @State var countryPattern : String = "### ### ####"
    @State var countryLimit : Int = 17
    @State var mobPhoneNumber = ""
    @State private var searchCountry: String = ""
    @Environment(\.colorScheme) var colorScheme
    @FocusState private var keyIsFocused: Bool
    private let countries: [CPData] = Bundle(for: PhoneNumberComponentWrapperView.self).decode("CountryNumbers.json")
    
    init(properties: PhoneNumberProps) {
        self.properties = properties
    }
    
    var body: some View {
        GeometryReader { geo in
            let hasHomeIndicator = geo.safeAreaInsets.bottom > 0
            NavigationStack {
                VStack {
                    
                    Text("Confirm country code and enter phone number")
                        .multilineTextAlignment(.center)
                        .font(.caption).bold()
                        .padding(.top, hasHomeIndicator ? 70 : 20)
                    
                    HStack {
                        Button {
                            presentSheet = true
                            keyIsFocused = false
                        } label: {
                            Text("\(countryFlag) \(countryCode)")
                                .padding(10)
                                .frame(minWidth: 80, minHeight: 47)
                                .background(backgroundColor, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                                .foregroundColor(foregroundColor)
                        }
                        
                        TextField("", text: $mobPhoneNumber)
                            .placeholder(when: mobPhoneNumber.isEmpty) {
                                Text("Phone number")
                                    .foregroundColor(.secondary)
                            }
                            .focused($keyIsFocused)
                            .keyboardType(.numbersAndPunctuation)
                            .onReceive(Just(mobPhoneNumber)) { _ in
                                applyPatternOnNumbers(&mobPhoneNumber, pattern: countryPattern, replacementCharacter: "#")
                            }
                            .padding(10)
                            .frame(minWidth: 80, minHeight: 47)
                            .background(backgroundColor, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    }
                    .padding(.top, 20)
                    .padding(.bottom, 15)
                }
                .animation(.easeInOut(duration: 0.6), value: keyIsFocused)
                .padding(.horizontal)
                
                Spacer()
                
            }
            .onTapGesture {
                hideKeyboard()
            }
            .sheet(isPresented: $presentSheet) {
                NavigationView {
                    List(filteredResorts) { country in
                        HStack {
                            Text(country.flag)
                            Text(country.name)
                                .font(.headline)
                            Spacer()
                            Text(country.dial_code)
                                .foregroundColor(.secondary)
                        }
                        .onTapGesture {
                            self.countryFlag = country.flag
                            self.countryCode = country.dial_code
                            self.countryPattern = country.pattern
                            self.countryLimit = country.limit
                            presentSheet = false
                            searchCountry = ""
                        }
                    }
                    .listStyle(.plain)
                    .searchable(text: $searchCountry, prompt: "Your country")
                }
                .presentationDetents([.medium, .large])
            }
            .presentationDetents([.medium, .large])
        }
        .ignoresSafeArea(.keyboard)
        .frame(height: 150)
        .cornerRadius(20)
    }
    
    var filteredResorts: [CPData] {
        if searchCountry.isEmpty {
            return countries
        } else {
            return countries.filter { $0.name.contains(searchCountry) }
        }
    }
    
    var foregroundColor: Color {
        if colorScheme == .dark {
            return Color(.white)
        } else {
            return Color(.black)
        }
    }
    
    var backgroundColor: Color {
        if colorScheme == .dark {
            return Color(.systemGray5)
        } else {
            return Color(.systemGray6)
        }
    }
    
    func applyPatternOnNumbers(_ stringvar: inout String, pattern: String, replacementCharacter: Character) {
        var pureNumber = stringvar.replacingOccurrences( of: "[^0-9]", with: "", options: .regularExpression)
        for index in 0 ..< pattern.count {
            guard index < pureNumber.count else {
                stringvar = pureNumber
                return
            }
            let stringIndex = String.Index(utf16Offset: index, in: pattern)
            let patternCharacter = pattern[stringIndex]
            guard patternCharacter != replacementCharacter else { continue }
            pureNumber.insert(patternCharacter, at: stringIndex)
        }
        stringvar = pureNumber
    }
}

extension View {
    func placeholder<Content: View>(
        when shouldShow: Bool,
        alignment: Alignment = .leading,
        @ViewBuilder placeholder: () -> Content) -> some View {
            
            ZStack(alignment: alignment) {
                placeholder().opacity(shouldShow ? 1 : 0)
                self
            }
        }
}
extension View {
    func hideKeyboard() {
        let resign = #selector(UIResponder.resignFirstResponder)
        UIApplication.shared.sendAction(resign, to: nil, from: nil, for: nil)
    }
}
extension View {
    func disableWithOpacity(_ condition: Bool) -> some View {
        self
            .disabled(condition)
            .opacity(condition ? 0.6 : 1)
    }
}
struct OnboardingButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        
        ZStack {
            RoundedRectangle(cornerRadius: 10, style: .continuous )
                .frame(height: 49)
                .foregroundColor(Color(.systemBlue))
            
            configuration.label
                .fontWeight(.semibold)
                .foregroundColor(Color(.white))
        }
    }
}
