extension String {
    var nilIfEmpty: String? {
        isEmpty ? nil : self
    }

    func formattedToDecimalPlaces(_ decimalPrecision: Int) -> String {
        let filtered = self.filter { "0123456789,.".contains($0) }.replacingOccurrences(of: ",", with: ".")
        if let decimalIndex = filtered.firstIndex(of: ".") {
            let integerPart = filtered[..<decimalIndex]
            let decimalPart = filtered[decimalIndex...].prefix(decimalPrecision + 1)
            if decimalPrecision == 0 {
                return String(integerPart)
            }
            return "\(integerPart)\(decimalPart)"
        }
        return filtered
    }

    var strippingHtmlTags: String {
        replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression, range: nil)
    }
}
