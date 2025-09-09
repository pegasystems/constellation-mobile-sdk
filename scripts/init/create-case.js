export async function createCase(caseClassName, startingFields) {
  const options = {
    pageName: 'pyEmbedAssignment',
    startingFields: startingFields
  };

  console.log("[CreateCase]", "Creating new case: " + caseClassName + ", startingFields: " + JSON.stringify(startingFields));
  await PCore.getMashupApi().createCase(caseClassName, PCore.getConstants().APP.APP, options);
}
