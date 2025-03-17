export function createCase(caseClassName, startingFields) {
  const options = {
      pageName: 'pyEmbedAssignment',
      startingFields: startingFields
  };

  PCore.getMashupApi()
    .createCase(caseClassName, PCore.getConstants().APP.APP, options)
    .then(() => console.log('createCase rendering is complete'));
};
