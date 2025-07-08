const importBootstrapShell = (version) => import(`https://release.constellation.pega.io/${version}/react/prod/bootstrap-shell.js`);

const awaitBoostrapShell = async (version) => {
  const splitVersion = version.split('.');
  if (splitVersion.length < 3) {
    throw new Error(`Invalid Pega version format: ${version}. Expected format is 'major.minor.patch'`);
  }
  const majorVersion = parseInt(splitVersion[0]);
  switch (majorVersion) {
    case 23:
    case 24:
      return await importBootstrapShell(`8.${majorVersion}.${splitVersion[1]}`);
    case 25:
      return await importBootstrapShell(`8.24.2`); // fallback to last released version of boostrap-shell
    default:
      throw new Error(`Unsupported Pega version: ${version}. Supported version is between 23.1.0 and 25.1.0`);
  }
}

export async function bootstrap(url, version, onPCoreReady) {
  console.log(`Importing bootstrap shell '${version}'`);
  let shell = await awaitBoostrapShell(version);
  const bootConfig = {
    restServerUrl: url,
    customRendering: true,
    onPCoreReadyCallback: onPCoreReady
  };

  await shell.bootstrapWithAuthHeader(bootConfig);
  console.log("Bootstrap complete!");

  console.log("Loading mashup...");
  shell.loadMashup(null, false);
}
