import Foundation
import OSLog

public struct CountryData: Codable, Identifiable {
    public let id: String
    public let name: String
    public let flag: String
    public let code: String
    public let dial_code: String
    public let pattern: String
    public let limit: Int

    static let `default` = CountryData(
        id: "0235",
        name: "USA",
        flag: "🇺🇸",
        code: "US",
        dial_code: "+1",
        pattern: "### ### ####",
        limit: 17
    )

    static let allCountries: [CountryData] = {
        do {
            return try Bundle(for: PhoneNumberProps.self).decode(jsonResource: "CountryData.json")
        } catch {
            Logger.current().error("Couldn't load country data: \(error)")
            return [CountryData.default]
        }
    }()

}
