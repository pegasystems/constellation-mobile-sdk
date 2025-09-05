import SwiftUI

struct CountryCodeSelector: View {
    @Binding var presentSheet: Bool
    @Binding var selectedCountry: CountryData
    @State private var searchCountry: String = ""

    private var filteredCountries: [CountryData] {
        if searchCountry.isEmpty {
            CountryData.allCountries
        } else {
            CountryData.allCountries.filter { $0.name.contains(searchCountry) }
        }
    }

    var body: some View {
        NavigationView {
            List(filteredCountries) { country in
                HStack {
                    Text(country.flag)
                    Text(country.name)
                        .font(.headline)
                    Spacer()
                    Text(country.dial_code)
                        .foregroundColor(.secondary)
                }
                .onTapGesture {
                    selectedCountry = country
                    presentSheet = false
                    searchCountry = ""
                }
            }
            .listStyle(.plain)
            .searchable(text: $searchCountry, prompt: "Country")
        }
        .presentationDetents([.medium, .large])
    }
}
