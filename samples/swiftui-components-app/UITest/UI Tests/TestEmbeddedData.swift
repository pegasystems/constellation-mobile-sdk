import XCTest

final class TestEmbeddedData: MockedAppTestCase {
    func testEmbeddedData() {
        tapCreateButton("EmbeddedData")
        app.staticTexts["EmbeddedData cars editable"].assertExists()
        fillTextField(0, "Client name", "Lukas")
        fillTextField(1, "Brand", "Bayerische Motoren Werke")
        fillTextField(2, "Model", "Vision Neue Klasse")

        app.staticTexts["Lukas"].assertExists()
        verifyDisplayOnlyValue("Bayerische Motoren Werke")
        verifyDisplayOnlyValue("Vision Neue Klasse")

        app.buttons.firstContainingLabel(text: "Next").tap()
        app.staticTexts["Verify EmbeddedData (E-6026)"].assertExists()
        XCTAssertTrue(app.staticTexts["Lukasz"].exists)
        verifyDisplayOnlyValue("Audi")
        verifyDisplayOnlyValue("A5")
    }

    private func verifyDisplayOnlyValue(_ expected: String) {
        XCTAssertTrue(app.scrollViews.staticTexts[expected].exists)
    }
}
