# Recorded Scenario Data

The car reference is `DataReferenceSingleRecord.pyGUID`; Model is the display value.

| Action submitted | Model | Identifier |
| --- | --- | --- |
| Combobox | C-Class | 8495d3b2-609a-44a3-a8aa-1300db094ef7 |
| Dropdown | A4 | 067f6be1-819a-41ab-b0a1-fc129199a074 |
| Table | 3 Series | ad8a5b02-83fe-4bf2-a738-135d473df87a |
| SimpleTable | Golf | c6398654-03bd-487c-a9b5-d1b474868ffc |
| Cards | Camry | eaf449dd-b7cc-483b-96f5-b9546336aa5d |

All five submissions contain only this reference under content and an empty pageInstructions array. Combobox and Dropdown refresh use the same bodies as their submissions.

Table fields: Brand, Model, Mileage, Length, DateOfProduction, Damaged, Price, Discount, CarAvailability, DealerEmail, DealerPhone, DealerWebsite, DealerWorkDayStart.

Card fields: Model title plus Brand, Model, DateOfProduction, Mileage, Price.

State transitions: New Service -> Combobox -> Dropdown -> Table -> Simple Table -> Cards -> Readonly. No final submission is requested.
