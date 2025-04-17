import XCTest

final class SampleMockedAppUITests: XCTestCase {
    private lazy var app: XCUIApplication = XCUIApplication()
    private let mainScreenTimeout = 120.0
    private let appInstallTimeout = 600.0

    override func setUpWithError() throws {
        // Check if app has been installed, this is needed on CI especially, where tests are running much slower
        // We are expecting at least two apps with below text, because one will be test runner itself
        waitForIconContaining(text: "SampleMockedApp", timeout: appInstallTimeout, count: 2)
        app.launch()
        try super.setUpWithError()
    }

    override func tearDownWithError() throws {
        screenshot()
        app.terminate()
        try super.tearDownWithError()
    }

    @MainActor
    func testFormDisplayAndInteraction() throws {
        // Button's label contains some extra spaces (padding?)
        let nextButton = app.buttons.firstContainingLabel(text: "Next")
        verifyMainScreen()
        tapCreateButton()

        fillTextField(0, "Name", "Jan", dismissSlidingDialog: true)
        fillTextField(1, "Surname", "Kowalski")
        // Second text field has also placeholder text set
        XCTAssertEqual(app.textFields.element(boundBy: 1).placeholderValue, "Surname here")

        // Set date picker to January 1st 2022
        app.datePickers.assertExists().tap()
        app.datePickers.buttons["Show year picker"].assertExists().tap()
        app.datePickers.pickerWheels.element(boundBy: 0)
            .assertExists()
            .adjust(toPickerWheelValue: "January")
        app.datePickers.pickerWheels.element(boundBy: 1)
            .assertExists()
            .adjust(toPickerWheelValue: "2022")
        app.datePickers.buttons["Hide year picker"].assertExists().tap()
        app.datePickers.buttons["Saturday, January 1"].assertExists().tap()
        // force tap required, as element is not hittable when data picker is shown
        // and we need this tap to hide data picker
        app.staticTexts.firstContainingLabel(text: "Step instructions").assertExists().forceTap()
        nextButton.assertExists().tap()
        
        app.staticTexts["Case ID"].assertExists()
        let caseID = app.textFields.firstMatch.assertExists().value as? String
        XCTAssertEqual(caseID, "S-24001")
    }

    @MainActor
    func testFormValidation() throws {
        verifyMainScreen()
        // Button's label contains some extra spaces (padding?)
        let nextButton = app.buttons.firstContainingLabel(text: "Next")
        let validationText = app.staticTexts["Cannot be blank"]
        tapCreateButton()
        nextButton.assertExists().tap()
        validationText.assertExists()
    }
}

// MARK: Test helpers
extension SampleMockedAppUITests {
    private func waitUntil(_ condition: () -> Bool, timeout: TimeInterval = 5,
                           delay: TimeInterval = 0.5, _ message: String? = nil) {
        let startTime = NSDate().timeIntervalSince1970
        while !condition() && NSDate().timeIntervalSince1970 - startTime < timeout {
            // delay subsequents checks; also convert seconds to microseconds
            usleep(UInt32(1_000_000.0 * delay))
        }
        if let message {
            XCTAssertTrue(condition(), message)
        } else {
            XCTAssertTrue(condition(), "Condition not met within \(timeout) seconds")
        }
    }

    private func waitForIconContaining(text: String, timeout: TimeInterval, count: Int) {
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        waitUntil ({
            springboard.icons.allContainingLabel(text: text).count >= count
        }, "Cannot find at least \(count) icon(s) with text: \(text)")
    }

    private func screenshot() {
        let screenshot = XCUIScreen.main.screenshot()
        let attachment = XCTAttachment(screenshot: screenshot, quality: XCTAttachment.ImageQuality.medium)
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    private func verifyMainScreen() {
        let sdkLabel = app.staticTexts["Pega Mobile Constellation SDK"].firstMatch
        sdkLabel.assertExists()
    }
    private func tapCreateButton(timeout: TimeInterval = 30.0) {
        let createButton = app.buttons["Create a new Case"]
        createButton.firstMatch.assertExists()
        waitUntil ({ // Retry tapping if needed, this is really only required on CI
            createButton.firstMatch.tapIfHittable()
            // When form is displayed create button should be NOT hittable
            return !createButton.firstMatch.isHittable
        }, timeout: timeout)
    }

    private func fillTextField(_ index: Int, _ label: String,
                               _ textToEnter: String, dismissSlidingDialog: Bool = false) {
        app.staticTexts[label].assertExists()
        app.textFields.element(boundBy: index).assertExists().tap()
        if dismissSlidingDialog {
            // Sometimes dialog to "speed up typing by sliding finger" is shown
            // While running test locally you can just press CMD+K once (per sim) and comment this out
            // But for new simulator (e.g. on CI) soft keyboard is being shown
            app.buttons["Continue"].tapIfHittable()
        }
        // \n will dismiss soft-keyboard itself minus above dialog
        app.textFields.element(boundBy: index).typeText(textToEnter + "\n")
    }
}

extension XCUIElementQuery {
    @discardableResult
    func assertExists(timeout: TimeInterval = 180.0) -> XCUIElement {
        self.firstMatch.assertExists(timeout: timeout)
    }

    @discardableResult
    func allContainingLabel(text: String) -> [XCUIElement] {
        let predicate = NSPredicate(format: "label CONTAINS[c] %@", text)
        return containing(predicate).allElementsBoundByIndex
    }

    @discardableResult
    func firstContainingLabel(text: String) -> XCUIElement {
        let predicate = NSPredicate(format: "label CONTAINS[c] %@", text)
        return containing(predicate).firstMatch
    }
}

extension XCUIElement {
    @discardableResult
    func assertExists(timeout: TimeInterval = 180.0) -> XCUIElement {
        XCTAssertTrue(waitForExistence(timeout: timeout), "Element \(self) still does not exists after \(timeout)s")
        // for method chaining
        return self
    }

    func forceTap(offsetX: CGFloat = 0.1, offsetY: CGFloat = 0.1) {
        coordinate(withNormalizedOffset: CGVector(dx: offsetX, dy: offsetY)).tap()
    }

    func tapIfHittable(timeout: TimeInterval = 2.5) {
        if (waitForExistence(timeout: timeout) && isHittable) {
            tap()
        }
    }
}
