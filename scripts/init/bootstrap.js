const TAG = "[Bootstrap]";
const loadScript = (url) =>
    new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });

const loadCoreJs = async (version) => {
    await loadScript(`https://release.constellation.pega.io/${version}/react/prod/prerequisite/constellation-core-web.js`);
};
const importBootstrapShell = (version) =>
    import(`https://release.constellation.pega.io/${version}/react/prod/bootstrap-shell.js`);

export const loadPrerequisites = async (version) => {
    const splitVersion = version.split(".");
    if (splitVersion.length < 3) {
        throw new Error(`Invalid Pega version format: ${version}. Expected format is 'major.minor.patch'`);
    }
    const majorVersion = parseInt(splitVersion[0]);
    switch (majorVersion) {
        case 23:
        case 24:
            return { kind: "esm", shell: await importBootstrapShell(`8.${majorVersion}.${splitVersion[1]}`) };
        case 25:
            return { kind: "esm", shell: await importBootstrapShell("8.24.2") }; // fallback to last released version of boostrap-shell
        case 26:
            await loadCoreJs(version);
            return { kind: "web" };
        default:
            throw new Error(`Unsupported Pega version: ${version}. Supported version is between 23.1.0 and 25.1.0`);
    }
};

export async function bootstrap(url, version, onPCoreReady) {
    console.log(TAG, `Importing bootstrap shell '${version}'`);
    const bootConfig = {
        restServerUrl: url,
        customRendering: true,
        onPCoreReadyCallback: onPCoreReady,
    };
    const prereq = await loadPrerequisites(version);
    if (prereq.kind === "web") {
        await PCore.getBootstrapUtils().bootstrapWithAuthHeader(bootConfig);
        console.log(TAG, "Bootstrap complete!");
        PCore.getBootstrapUtils().loadMashup(null, false);
        console.log(TAG, "Mashup loaded!");
        return;
    }

    await prereq.shell.bootstrapWithAuthHeader(bootConfig);
    console.log(TAG, "Bootstrap complete!");
    prereq.shell.loadMashup(null, false);
    console.log(TAG, "Mashup loaded!");

}
