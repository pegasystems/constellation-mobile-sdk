export async function openAssignment(assignmentId) {
    const options = {
        pageName: "pyEmbedAssignment",
    };

    console.log("[OpenAssignment]", "Opening assignment: " + assignmentId);
    await PCore.getMashupApi().openAssignment(assignmentId, PCore.getConstants().APP.APP, options);
}
