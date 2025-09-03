import Foundation

extension Bundle {
    func decode<T: Decodable>(jsonResource name: String) throws -> T {
        if let url = url(forResource: name, withExtension: nil) {
            try JSONDecoder().decode(
                T.self,
                from: try Data(contentsOf: url)
            )
        } else {
            throw CocoaError(.fileNoSuchFile, userInfo: [
                NSDebugDescriptionErrorKey: "Couldn't find resource named \(name)"
            ])
        }
    }
}
