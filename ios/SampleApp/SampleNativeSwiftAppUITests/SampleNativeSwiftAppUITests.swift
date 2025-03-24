//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import XCTest

final class SampleNativeSwiftAppUITests: XCTestCase {
    private lazy var app: XCUIApplication = XCUIApplication()

    override func setUpWithError() throws {
        try super.setUpWithError()
        continueAfterFailure = false
        app.launchArguments += ["forceLogin"]
        app.launch()
    }

    override func tearDownWithError() throws {
        screenshot()
        try super.tearDownWithError()
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

    @MainActor
    func testHappyPath() throws {
        let timeout = 30.0
        let sdkLabel = app.staticTexts["Pega Mobile Constellation SDK"].firstMatch
        let createButton = app.buttons["Create a new Case"].firstMatch
        let loginField = app.webViews.textFields["User name *"].firstMatch
        let passField = app.webViews.secureTextFields["Password *"].firstMatch
        let loginButton = app.webViews.buttons["Log in"].firstMatch

        // !!!!!!!! MOVE THIS TO GITHUB SECRETS !!!!!!!!!
        let login = "rep@mediaco"
        let pass = "rules@1234"

        XCTAssertTrue(sdkLabel.waitForExistence(timeout: timeout))
        XCTAssertTrue(createButton.waitForExistence(timeout: timeout))
        createButton.tap()
        acceptAlert()

        XCTAssertTrue(loginField.waitForExistence(timeout: timeout))
        XCTAssertTrue(passField.waitForExistence(timeout: timeout))
        XCTAssertTrue(loginButton.waitForExistence(timeout: timeout))
        loginField.tap()
        loginField.typeText(login)
        passField.tap()
        passField.typeText(pass)
        loginButton.tap()

        screenshot()
        sleep(240)
        screenshot()
        print("X")
    }
}
