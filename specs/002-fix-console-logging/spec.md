# Feature Specification: Fix SDK Console Logging

**Feature Branch**: `bugfix/mloct/BUG-1028166-pr`
**Created**: 2026-10-22
**Status**: Draft
**Input**: BUG-1028166: Suppress routine SDK console output in non-debug mode without losing warnings and errors. Replace per-configuration debugging with one process-wide `ConstellationSdk.debuggable` setting; remove `debuggable` from `ConstellationSdkConfig`, accepting the public API break. Filter SDK-owned native diagnostics, including direct Android platform-log calls, and messages forwarded from the embedded console at a central SDK logging boundary. Leave unrelated browser-console and host-application logging unchanged.

## Summary

Application integrators set `ConstellationSdk.debuggable` once before SDK creation instead of configuring each SDK instance. It defaults to `false`. While it is false, SDK-owned and forwarded informational, debug, and verbose messages are absent from Android and iOS platform logs; warnings and errors remain visible. Logging reads the current global value. Engines also read it directly when applying inspection and building embedded initialization settings, without retaining a local copy. Changing it mid-flow is not recommended or a supported integration pattern; the setter does not synchronize existing views.

## Clarifications

### Session 2026-10-22

- Q: May non-warning/error messages from custom components inside the SDK's embedded view be hidden by the same filter? → A: Yes; filter the shared forwarded console messages, including custom-component messages, when debugging is disabled.
- Q: Must other console utilities such as trace, table, count, timing, or assertions be filtered? → A: No; limit the change to already-forwarded message levels and SDK-owned native information/debug output. Do not change JavaScript files.

### Session 2026-10-26

- Q: Should every SDK-owned routine message be individually guarded by the debug setting? → A: No; apply the severity policy at one logging boundary, not at each routine message site.
- Q: Must the logging policy remain instance-owned? → A: No; the integrator accepts shared debug state across SDK instances and prefers a simpler global logging policy.
- Q: Where does the integrator set debugging? → A: Remove `debuggable` from `ConstellationSdkConfig` and expose a mutable `ConstellationSdk.debuggable` companion setting. The resulting public API break is accepted.
- Q: Should SDK-owned direct Android platform-log calls also follow the setting? → A: Yes; non-warning SDK output must not bypass the central filter.
- Q: Must changing the setting update existing WebView inspection state? → A: No; change logging as soon as possible without complex inspection synchronization. Apply inspection at engine initialization and document that existing views are not reconfigured.

### Session 2026-11-02

- Q: How should the logging implementation be simplified? → A: Use one `core.Log` facade with `v/d/i/w/e` methods, one private severity gate, and internal platform-specific writers. Remove the Android engine logger and public output callback. Keep existing String `i/w/e` signatures and lazy routine-message overloads.
- Q: Should console debug messages retain their severity on iOS? → A: Yes; explicitly map the existing JavaScript levels 1/2/3/4 to error/warning/info/debug, without changing JavaScript.
- Q: How do applications restrict routine logging to debug builds? → A: Initialize the global flag from the host application's build setting before SDK creation. The SDK itself remains default-off and does not infer a consuming application's build type. Subsequent user feedback preserves the samples' existing explicit settings instead of adding build-mode selection.
- Q: Must engines retain an initialization-time copy of the flag? → A: No; read `ConstellationSdk.debuggable` directly at each existing inspection/configuration use. Set the flag before SDK creation and leave it unchanged during flows. This supersedes the earlier snapshot contract; no runtime inspection synchronization is required.
- Q: Should the samples and JVM logging test be retained as changed? → A: No; restore the samples' previous debug settings, including the SwiftUI plist flag and unconditional enablement elsewhere. Remove `engine-webview/src/jvmTest/.../LogTest.kt` and keep the companion property's KDoc concise.
- Q: How should Android WebView `LOG` messages be prioritized? → A: Map `LOG` to info and `TIP` to verbose; other WebView levels keep their corresponding severities. Different JavaScript console methods may arrive with the same WebView level.
- Q: Where should the breaking migration be documented? → A: Keep it out of the integration how-to guides and include it in the next release notes; until then, the PR description and commit history record it.

## Scope

### In Scope

- Replace the per-instance `ConstellationSdkConfig.debuggable` property with a mutable, process-wide `ConstellationSdk.debuggable` companion property that defaults to `false`.
- Apply the current setting to subsequent SDK-owned native and forwarded console messages across all instances, without per-message checks at the call sites.
- Include SDK-owned direct Android platform-log messages in the central filtering policy, preserving their existing tags, levels, and warning/error behavior.
- Preserve the already-forwarded levels, including messages from custom components inside SDK views. Use native Logcat output for every common logger call on Android; preserve iOS/JVM text formatting, with forwarded JavaScript debug messages now labeled DEBUG instead of INFO.
- Read the companion property directly when applying WebView inspection and building the existing embedded-engine debug configuration. Keep existing application points, without an engine-local copy or automatic synchronization.
- Test global behavior and the migration from the removed configuration argument. Update public documentation and release-impact guidance for Kotlin and Swift users.
- Preserve existing sample debug settings; document host-build initialization as an option for applications requiring debug-build-only logging.

### Out of Scope

- Per-instance logging settings or isolation between SDK instances.
- Automatically deriving `debuggable` from the host application's build type; the setting defaults to `false` regardless of build type.
- Supporting mid-flow flag changes or automatically synchronizing inspection/embedded settings when the property changes.
- Changing host-application logging, including logging performed independently by application-provided resource providers.
- Filtering browser-console output that the platform itself produces independently of the SDK's native forwarding path, or previously unforwarded console utilities, assertions, and traces.
- Changing bundled JavaScript files, script logging sites, supported console levels, or warning/error visibility.

## User Scenarios & Testing

### User Story 1 – Hide routine SDK output (Priority: P1)

As an application integrator, I can keep routine SDK messages out of Android and iOS platform logs without losing warnings and errors.

**Why this priority**: Routine output obscures actionable diagnostics and can disclose details that should not be logged during normal operation.

**Independent Test**: With debugging disabled by default and explicitly, emit each supported console level from an SDK view and custom component, plus SDK-owned native messages (including direct Android platform-log messages); repeat with debugging enabled.

**Acceptance Scenarios**:

1. **Given** debugging has not been enabled or is explicitly disabled, **when** an SDK view forwards informational, debug, or verbose messages, **then** those messages do not appear in the SDK's native platform-log output.
2. **Given** debugging is disabled, **when** SDK-owned native code emits informational, debug, or verbose messages, including through direct Android platform logging, **then** those messages are absent from the SDK's native platform-log output.
3. **Given** either debug setting, **when** an SDK view or SDK-owned native code emits a warning or error, **then** it remains visible with its existing platform level and identifying information.
4. **Given** debugging is enabled, **when** SDK-owned native code or an SDK view emits supported informational, debug, or verbose messages, **then** those messages appear with the correct level and identifying information; iOS forwarded JavaScript debug messages are labeled DEBUG rather than INFO.
5. **Given** a custom component inside an SDK view, **when** it sends a supported console message, **then** its forwarded output follows the same severity policy; logging performed independently by the host app remains unchanged.
6. **Given** an SDK developer adds another routine diagnostic through the SDK logging boundary, **when** debugging is disabled, **then** it is filtered without an individual debug-setting guard at that message site.

### User Story 2 – Change logging for all SDK instances (Priority: P1)

As an application integrator using multiple SDK instances, I can switch their shared debug logging behavior through one SDK-level setting.

**Why this priority**: A process-wide switch is simpler to use and maintain than passing logging state through SDK layers.

**Independent Test**: Initialize two SDK instances and emit routine and warning/error messages from each while toggling the global setting off, on, and off again, without recreating either instance.

**Acceptance Scenarios**:

1. **Given** two existing SDK instances and debugging disabled, **when** either emits a routine message, **then** neither instance's routine message appears in platform logs; warnings and errors from both remain visible.
2. **Given** those same instances, **when** the integrator enables debugging, **then** their next routine messages both appear without recreating either instance.
3. **Given** debugging is enabled, **when** the integrator disables it again, **then** subsequent routine messages from both instances are suppressed; previously emitted messages are unchanged.
4. **Given** an integrator creates another SDK instance, **when** no one assigns the global setting again, **then** creating or configuring that instance does not reset logging behavior.

### User Story 3 – Migrate and understand the new API (Priority: P2)

As an SDK integrator, I can migrate existing Kotlin and Swift setup code to the shared debug setting and understand what it does not control.

**Why this priority**: Removing a public configuration property breaks existing callers and requires clear migration and inspection-timing guidance.

**Independent Test**: Follow the published migration example on Android and iOS with the flag set before SDK creation and kept constant throughout the flow; verify logging, inspection and embedded configuration use that setting.

**Acceptance Scenarios**:

1. **Given** existing setup code passing `debuggable` to `ConstellationSdkConfig`, **when** an integrator follows the new guidance, **then** they remove that argument and set `ConstellationSdk.debuggable` before initializing an engine if they want inspection enabled.
2. **Given** debugging is enabled before SDK creation and kept unchanged, **when** an engine configures inspection or builds embedded initialization settings, **then** it reads `true` directly from the companion property.
3. **Given** debugging is disabled before SDK creation and kept unchanged, **when** an engine configures inspection or builds embedded initialization settings, **then** it reads `false` directly from the companion property.
4. **Given** published API guidance, **when** an integrator looks up the debug property, **then** it states the global/default behavior, affected logging levels, limits of browser/host logging, inspection timing, security implications, and the Kotlin/Swift migration.
5. **Given** the existing sample setup, **when** it initializes SDK logging, **then** its previous explicit setting is preserved, including unconditional enablement or the SwiftUI `Debuggable` plist value, regardless of build mode.

### Edge Cases

- Before any SDK instance exists, the default global value is `false` and SDK-owned routine diagnostics are suppressed.
- The last assignment to `ConstellationSdk.debuggable` governs subsequent SDK logging for every instance; constructing an instance does not overwrite it.
- When the value changes while SDK instances remain active, the next emitted message uses the current setting; existing log records are unaffected.
- Warnings and errors remain visible regardless of the current setting or number of instances; their platform severity, tags, and context are preserved.
- Android WebView inspection is process-wide. The setter does not automatically update inspection; subsequent existing engine operations read the current property directly. Mid-flow changes are not a supported integration pattern.
- Browser-console output independent of native SDK forwarding may still be visible in inspection tools, including for a view created while debugging was enabled.
- Independently logged host-app or external-provider messages are outside the SDK policy; SDK-owned direct Android logging is not.

## Requirements

### Functional Requirements

- **FR-001**: The SDK MUST expose one mutable, process-wide `ConstellationSdk.debuggable` companion property, defaulting to `false`, and MUST remove `debuggable` from `ConstellationSdkConfig` as an explicitly breaking change.
- **FR-002**: The current global value MUST control the next SDK-owned or forwarded native-log emission from every SDK instance, including instances created before the last assignment; creating another SDK instance MUST NOT reset the value.
- **FR-003**: When the property is `false`, SDK-owned native and supported forwarded informational, debug, and verbose messages MUST be suppressed in Android and iOS platform logs, including SDK-owned direct Android platform-log messages and supported messages from custom components in SDK views.
- **FR-004**: When the property is `true`, supported routine messages MUST remain visible with the correct native level and tag. Android WebView `LOG` maps to info and `TIP` to verbose; the WebView determines which level each JavaScript method reports. All Android common logger calls MUST use Logcat; iOS/JVM retain text formatting, with JavaScript level 4 correctly labeled DEBUG instead of INFO.
- **FR-005**: SDK-owned native and supported forwarded warnings and errors MUST remain visible with their existing native level, tag, and context for either value.
- **FR-006**: The SDK's shared logging boundary MUST enforce the severity policy for both SDK-owned native diagnostics and supported forwarded console messages, rather than requiring individual routine-message sites to test the property; SDK-owned direct Android platform-log calls MUST NOT bypass this boundary.
- **FR-007**: Engines MUST read `ConstellationSdk.debuggable` directly when applying WebView inspection and building embedded-engine debug configuration, without storing an engine-local copy. Existing application points remain unchanged; no setter-driven synchronization is required. Integrators MUST be advised to set the flag before SDK creation and not change it mid-flow.
- **FR-008**: The change MUST NOT alter independent host-application logging, independently emitted underlying browser-console output, previously unforwarded console utilities, or bundled JavaScript behavior.
- **FR-009**: Focused regression coverage MUST verify defaults, supported forwarded and native levels (including direct Android output), preservation of warnings/errors and platform conventions, shared behavior across two running SDK instances, live toggles in both directions, and inspection initialization timing on Android and iOS where observable.
- **FR-010**: Public SDK documentation and release-impact guidance MUST explain the breaking Kotlin/Swift configuration change and migration, process-wide logging behavior, default, supported levels, custom-component side effect, host/browser boundaries, inspection timing, and the risk of exposing routine diagnostics when enabled.
- **FR-011**: One common `Log.v/d/i/w/e` facade MUST own a private filtering decision and internal platform writers; engine call sites MUST NOT select output sinks or pass loggers through layers. Existing String `i/w/e` calls remain supported, with lazy overloads for routine levels.
- **FR-012**: Mobile samples MUST preserve their previous explicit debug settings without new build-mode plumbing. Integration guidance MAY recommend host-build initialization for applications requiring debug-build-only logging. The runtime flag remains mutable and is not a hard release-build prohibition.

### Key Entities

- **SDK-level debug setting**: The one mutable process-wide value read directly by logging and engine inspection/configuration operations.
- **Forwarded console message**: A supported message from an SDK view, including custom-component scripts, delivered to SDK-managed native platform logging.
- **SDK-owned native diagnostic**: A message generated by SDK native code, including its existing platform-specific output paths; it follows the same shared severity policy.
- **Engine view**: A view whose inspection and embedded initialization settings use the global value at their existing application points; no engine-local debug state is retained.

## Success Criteria

### Measurable Outcomes

- **SC-001**: On both supported mobile platforms, 100% of supported routine SDK-owned and forwarded message cases are absent from SDK native platform logs with debugging disabled and visible with debugging enabled; 100% of corresponding warning/error cases remain visible for both values.
- **SC-002**: In a two-instance scenario, enabling and then disabling debugging changes the visibility of the next routine message from both existing instances each time, without recreating either one.
- **SC-003**: All sampled SDK-owned Android messages previously emitted through direct platform logging follow the same rule and retain their severity and identifying tag when emitted; no sampled SDK-owned routine message bypasses the rule.
- **SC-004**: No routine-message call site needs its own check of the debug property; a newly added SDK diagnostic using the shared logging boundary is subject to the same rule.
- **SC-005**: Kotlin and Swift setup examples migrate away from the removed configuration argument, set the SDK-level property before SDK creation, and recommend leaving it unchanged during flows. Neither engine retains a debug-state copy.
- **SC-006**: Existing warning/error, host-application, and independently emitted browser-console behavior is preserved in the corresponding regression and documentation scenarios.

## Assumptions and Open Questions

- "Non-debug mode" means `ConstellationSdk.debuggable == false`, not an automatic build-variant check; applications can choose when to set it to `true`.
- The last assignment to the global property wins. It affects all SDK instances and may expose routine information from each; consumers should enable it only in environments appropriate for diagnostics.
- Filtering concerns the SDK's native platform-log paths, not other consumers of the underlying browser console or independently logged external resource providers.
- The flag is expected to remain constant during flows. Engines read it directly for inspection and embedded initialization configuration at the existing lifecycle points. The setter does not synchronize views; Android inspection may affect other WebViews in the process.
