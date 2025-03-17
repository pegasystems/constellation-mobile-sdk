const importBootstrapShell = (version) => import(`https://release.constellation.pega.io/${version}/react/prod/bootstrap-shell.js`);

export const bootstrap = async (url, version, onPCoreReady) => {
  console.log(`Importing bootstrap shell '${version}'`);
  const shell = await importBootstrapShell(version);

  const bootConfig = {
    restServerUrl: url,
    customRendering: true,
    onPCoreReadyCallback: onPCoreReady
  };

  await shell.bootstrapWithAuthHeader(bootConfig);
  console.log("Bootstrap complete!");

  console.log("Loading mashup...");
  shell.loadMashup(null, false);
};
