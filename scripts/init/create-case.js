export async function createCase(caseClassName, startingFields) {
  const options = {
    pageName: 'pyEmbedAssignment',
    startingFields: startingFields
  };

  console.log("Creating new case: " + caseClassName);
  await PCore.getMashupApi().createCase(caseClassName, PCore.getConstants().APP.APP, options);
};
