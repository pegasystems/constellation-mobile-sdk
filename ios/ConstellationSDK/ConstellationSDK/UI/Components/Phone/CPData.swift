import Foundation

struct CPData: Codable, Identifiable {

    class Bar {}

    let id: String
    let name: String
    let flag: String
    let code: String
    let dial_code: String
    let pattern: String
    let limit: Int

    static let allCountry: [CPData] = Bundle(for: CPData.Bar.self).decode("CountryNumbers.json")
    static let example = allCountry[0]
}
