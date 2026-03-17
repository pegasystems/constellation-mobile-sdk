const TAG = "[Bootstrap]";
const importBootstrapShell = (staticContentServerUrl) => import(`${staticContentServerUrl}bootstrap-shell.js`);

const getStaticContentServerUrl = async (url) => {
    const response = await fetch(`${url}/api/application/v2/data_views/D_pxBootstrapConfig`);
    if (!response.ok) {
        throw new Error(`Failed to fetch bootstrap config: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    try {
        const config = JSON.parse(data.pyConfigJSON);
        return config?.serviceConfig?.staticContentServer;
    } catch (e) {
        throw new Error(`Failed to parse pyConfigJSON: ${e}`);
    }
};

export async function bootstrap(url, onPCoreReady) {
    const staticContentServerUrl = await getStaticContentServerUrl(url);
    console.log(TAG, `Importing bootstrap shell: ${staticContentServerUrl}bootstrap-shell.js`);
    const shell = await importBootstrapShell(staticContentServerUrl);
    const bootConfig = {
        restServerUrl: url,
        customRendering: true,
        onPCoreReadyCallback: onPCoreReady,
    };
    await shell.bootstrapWithAuthHeader(bootConfig);
    console.log(TAG, "Bootstrap complete!");
    shell.loadMashup(null, false);
    console.log(TAG, "Mashup loaded!");
}
