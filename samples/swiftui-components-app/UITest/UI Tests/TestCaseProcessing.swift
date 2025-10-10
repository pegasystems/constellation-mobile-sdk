import XCTest

final class TestCaseProcessing: MockedAppTestCase {
//    @MainActor
//    func testFormDisplayAndInteraction() throws {
//        // Button's label contains some extra spaces (padding?)
//        let nextButton = app.buttons.firstContainingLabel(text: "Next")
//        verifyMainScreen()
//        tapCreateButton("SDKTesting")
//
//        fillTextField(0, "Name", "Jan", dismissSlidingDialog: true)
//        fillTextField(1, "Surname", "Kowalski")
//        // Second text field has also placeholder text set
//        XCTAssertEqual(app.textFields.element(boundBy: 1).placeholderValue, "Surname here")
//
//        // Set date picker to January 1st 2022
//        app.datePickers.assertExists().tap()
//        app.datePickers.buttons["Show year picker"].assertExists().tap()
//        app.datePickers.pickerWheels.element(boundBy: 0)
//            .assertExists()
//            .adjust(toPickerWheelValue: "January")
//        app.datePickers.pickerWheels.element(boundBy: 1)
//            .assertExists()
//            .adjust(toPickerWheelValue: "2022")
//        app.datePickers.buttons["Hide year picker"].assertExists().tap()
//        app.datePickers.buttons["Saturday, January 1"].assertExists().tap()
//        // force tap required, as element is not hittable when data picker is shown
//        // and we need this tap to hide data picker
//        app.staticTexts.firstContainingLabel(text: "Some description").forceTapIfExists()
//        app.staticTexts.firstContainingLabel(text: "Step instructions").forceTapIfExists()
//        nextButton.assertExists().tap()
//
//        app.staticTexts["Case ID"].assertExists()
//        let caseID = app.textFields.firstMatch.assertExists().value as? String
//        XCTAssertEqual(caseID, "S-24001")
//    }
//
//    @MainActor
//    func testFormValidation() throws {
//        verifyMainScreen()
//        // Button's label contains some extra spaces (padding?)
//        let nextButton = app.buttons.firstContainingLabel(text: "Next")
//        let validationText = app.staticTexts["Cannot be blank"]
//        tapCreateButton("SDKTesting")
//        nextButton.assertExists().tap()
//        validationText.assertExists()
//    }
}
