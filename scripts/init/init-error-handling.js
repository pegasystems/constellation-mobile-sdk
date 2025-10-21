import { bridge } from '../bridge/native-bridge.js';

export function initErrorHandling() {
  window.addEventListener('error', errorEvent => {
    bridge.onError("UncaughtError", `${errorEvent.message} in ${errorEvent.filename} at line ${errorEvent.lineno}`);
  })
  window.addEventListener('unhandledrejection', rejectionEvent => {
    bridge.onError("UnhandledRejectionError", `Unhandled promise rejection: ${stringify(rejectionEvent.reason)}`);
  });

}

function stringify(reason) {
  return JSON.stringify(reason).replace(/^"|"$/g, '');
}
