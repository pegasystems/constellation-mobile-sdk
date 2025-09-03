import XCTest

class MockedAppTestCase: XCTestCase {
    lazy var app: XCUIApplication = XCUIApplication()
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
}

// MARK: Test helpers
extension MockedAppTestCase {
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
        }, timeout: appInstallTimeout, "Cannot find at least \(count) icon(s) with text: \(text)")
    }

    private func screenshot() {
        let screenshot = XCUIScreen.main.screenshot()
        let attachment = XCTAttachment(screenshot: screenshot, quality: XCTAttachment.ImageQuality.medium)
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    func verifyMainScreen() {
        let sdkLabel = app.staticTexts["Pega Mobile Constellation SDK"].firstMatch
        sdkLabel.assertExists()
    }
    func tapCreateButton(_ caseTitle: String = "a new", timeout: TimeInterval = 30.0) {
        let createButton = app.buttons["Create \(caseTitle) Case"]
        createButton.firstMatch.assertExists()
        waitUntil ({ // Retry tapping if needed, this is really only required on CI
            createButton.firstMatch.tapIfHittable()
            // When form is displayed create button should be NOT hittable
            return !createButton.firstMatch.isHittable
        }, timeout: timeout)
    }

    func fillTextField(_ index: Int, _ label: String,
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

    func forceTapIfExists(timeout: TimeInterval = 2.5) {
        if (waitForExistence(timeout: timeout)) {
            forceTap()
        }
    }
}
