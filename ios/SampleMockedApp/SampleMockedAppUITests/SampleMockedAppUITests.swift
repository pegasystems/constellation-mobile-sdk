//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import XCTest

final class SampleMockedAppUITests: XCTestCase {
    private lazy var app: XCUIApplication = XCUIApplication()
    private let mainScreenTimeout = 120.0
    private let appInstallTimeout = 600.0
    private let timeout = 120.0

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

    private func waitForIconContaining(text: String, timeout: TimeInterval, count: Int) {
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let predicate = NSPredicate(format: "label CONTAINS[c] %@", text)
        let getIconCount = { () -> Int in
            springboard.icons.containing(predicate).allElementsBoundByIndex.count
        }
        let startTime = NSDate().timeIntervalSince1970
        while getIconCount() < count && NSDate().timeIntervalSince1970 - startTime < timeout {
            usleep(100_000)
        }
        XCTAssertGreaterThanOrEqual(getIconCount(), count, "Cannot find at least \(count) icon(s) with text: \(text)")
    }

    private func acceptAlert() {
        // addUIInterruptionMonitor does not seem to work anymore, see:
        // https://developer.apple.com/forums/thread/737880
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let alertButton = springboard.buttons["Continue"].firstMatch
        if alertButton.waitForExistence(timeout: 10.0) {
            alertButton.tap()
        }
    }

    private func screenshot() {
        let screenshot = XCUIScreen.main.screenshot()
        let attachment = XCTAttachment(screenshot: screenshot, quality: XCTAttachment.ImageQuality.medium)
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    private func verifyMainScreen() {
        let sdkLabel = app.staticTexts["Pega Mobile Constellation SDK"].firstMatch
        XCTAssertTrue(sdkLabel.waitForExistence(timeout: mainScreenTimeout))
    }
    private func tapCreateButton() {
        let createButton = app.buttons["Create a new Case"].firstMatch
        XCTAssertTrue(createButton.waitForExistence(timeout: timeout))
        createButton.tap()
    }

    @MainActor
    func testFormDisplay() throws {
        let textFieldLabels = ["Name", "Surname", "Url", "description"]
        verifyMainScreen()
        tapCreateButton()
        for index in 0...3 {
            XCTAssertTrue(app.staticTexts[textFieldLabels[index]].waitForExistence(timeout: timeout))
            XCTAssertTrue(app.textFields.element(boundBy: index).waitForExistence(timeout: timeout))
        }
        // Second text field should have also placeHolder value set
        XCTAssertEqual(app.textFields.element(boundBy: 1).placeholderValue, "Surname here")
    }

    @MainActor
    func testFormValidation() throws {
        verifyMainScreen()
        // Button's label contains some extra spaces (padding?)
        let nextButton = app.buttons["Next   "].firstMatch
        let validationText = app.staticTexts["Cannot be blank"]
        tapCreateButton()
        XCTAssertTrue(nextButton.waitForExistence(timeout: timeout))
        nextButton.tap()
        XCTAssertTrue(validationText.waitForExistence(timeout: timeout))
    }
}
