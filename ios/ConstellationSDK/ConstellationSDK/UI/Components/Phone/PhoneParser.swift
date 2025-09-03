public class PhoneParser {
    private static let sortedCountries = CountryData
        .allCountries
        .sorted { $0.code.count > $1.code.count }

    public static func parse(_ number: String) -> ParsedPhoneNumber {
        // WebUI applies +1 if no country code - lets do the same.
        var country = sortedCountries.first {
            number.hasPrefix($0.dial_code)
        } ?? CountryData.default

        // if country code +1, use US
        if country.dial_code == "+1", country.code != "US" {
            country = .default
        }

        return ParsedPhoneNumber(
            country: country,
            number: String(number.dropFirst(country.dial_code.count))
        )
    }

    private init() {} // shall not be instantiated
}

public struct ParsedPhoneNumber {
    let country: CountryData
    let number: String
}
