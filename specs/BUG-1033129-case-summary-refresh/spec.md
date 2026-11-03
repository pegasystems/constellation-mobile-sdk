# BUG-1033129 — Disable unused case-summary refresh

## Scope

Fix [GitHub issue #168](https://github.com/pegasystems/constellation-mobile-sdk/issues/168).
The form-only SDK disables deferred case-summary updates in JavaScript when the
CoreJS update method is available. Do not expose a native configuration API.

## Acceptance criteria

1. After bootstrap and before form processing, check that `updateFeatureMap` is a function.
2. If available, call it with only `{ deferUpdateCaseSummaryView: false }`.
3. If missing, log a concise warning and continue with CoreJS's initialized behavior.
4. Do not add a dedicated try/catch. Exceptions from an existing method follow the
   normal initialization-error path.
5. Native APIs, engine configuration, and initialization-string encoding remain unchanged.

## Verification

No dedicated automated test for this narrow initialization branch. Rely on code review
and existing engine checks; do not add a test harness solely to cover a private CoreJS API.

## Compatibility

No native API or binary-signature changes. Preserve unrelated work and leave the fix
uncommitted on `bugfix/mloct/BUG-1033129`.
