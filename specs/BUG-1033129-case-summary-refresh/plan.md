# Implementation plan

Branch: `bugfix/mloct/BUG-1033129`.

1. Remove the native setting, transport, compatibility overload, and initialization
   string-encoding changes introduced for this bug. Leave pre-existing encoding alone.
2. Hardcode the single-property false update in `init.js`, guarded by a function check.
   A missing method logs a concise warning. Do not add a dedicated try/catch.
3. Remove obsolete configuration tests. Do not retain a standalone WebView test for
   this small private-API guard; keep production code free of test-only hooks.
4. Remove public-API documentation and retain concise internal-behavior release notes.
5. Run existing engine checks and review the diff. No native production code changes remain.

All changes preserve the existing common/platform source-set boundaries. Keep the
user's sample configuration and untracked workflow output untouched.
