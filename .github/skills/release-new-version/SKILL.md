---
name: "release-new-version"
description: "Prepare a new Constellation Mobile SDK release: collect changes since the last release tag, choose the semantic version, write docs/releases/vX.Y.Z.md, and bump version numbers in Gradle and docs."
metadata:
  author: "constellation-mobile-sdk"
---

## User Input

```text
$ARGUMENTS
```

The user input may name the base version (for example `v4.1.0`), the target version, or both. You **MUST** consider it before proceeding (if not empty).

## Goal

Leave a release preparation in the working tree, ready for review:

1. `docs/releases/vX.Y.Z.md`: release notes for every change since the base version.
2. The version number updated in `gradle.properties` and in the integration guides.

Do **not** commit, tag, push, or publish unless the user explicitly asks. Do **not** modify `.github/workflows/`, `.github/actions/`, or `.github/workflow-scripts/`.

## Steps

### 1. Find the base release

- List tags: `git --no-pager tag --sort=-creatordate | head -20`.
- Tag names are not always consistent (for example `v.4.1.0` instead of `v4.1.0`). Match the version the user asked for against the real tag name. If no tag matches, or several do, ask the user.
- Read the previous release notes in `docs/releases/` and reuse their structure and tone. The most recent file (for example `docs/releases/v4.1.0.md`) is the reference format.
- Read the current version from `gradle.properties` (`version=`).

### 2. Collect the changes

- `git --no-pager log --no-merges --format='%h %ad %s%n%b' --date=short <tag>..HEAD`
- For each commit, run `git --no-pager show --stat <sha>`, then inspect the meaningful diffs. Leave out large mock fixtures (`**/responses/**`, CDN bundles) to keep the output small, for example `git show <sha> -- '*.kt' '*component.js' '*.md' '*.kts' '*.toml'`.
- Classify each change:
  - **Public API change**: anything in `core/src/commonMain/.../api/`, or public classes in `engine-webview`, `ui-components-cmp`, or `ui-renderer-cmp`. This includes renamed constructors, parameters, or functions, changes to component types or JS mappings, and changed resource paths.
  - **Feature or highlight**
  - **Bug fix**: the `BUG-` commit prefix is a good hint, but read the diff.
  - **Documentation**
  - **Testing, tooling, or CI**: mention CI changes, but don't edit workflows.
  - **Dependency or build change**: `gradle/libs.versions.toml`, the Gradle Wrapper, or the required JDK.
- Never invent behavior. Describe only what the diffs show.

### 3. Choose the version (semantic versioning)

- **MAJOR**: any breaking change to the public API. This includes:
  - source-breaking changes: renamed or removed public classes, functions, or parameters (renaming a parameter breaks callers that use named arguments), or changed types;
  - binary-breaking changes: changed JVM signatures, even when source code that passes arguments positionally still compiles. For example, changing a constructor parameter type from `OkHttpClient` to `Call.Factory`;
  - removed components, changed renderer contracts, or changed bundled resource paths that integrators rely on.
- **MINOR**: backward-compatible features, such as new properties, new components, or a newly supported Pega version.
- **PATCH**: backward-compatible bug fixes only.
- Present your recommendation and the reason for it, listing any breaking changes. Then confirm the target version with the user through `ask_user`, with the recommended option first. If there are breaking changes, never silently choose anything other than a major version.

### 4. Write the release notes

Create `docs/releases/vX.Y.Z.md`. The file name **must** be exactly `v<MAJOR>.<MINOR>.<PATCH>.md`, because `.github/workflow-scripts/publish.sh --custom-release-notes` loads `docs/releases/${VERSION}.md`. The script sets PATCH by incrementing the last GitHub release for the given MAJOR.MINOR, so the first release of a new MAJOR.MINOR is `.0`.

Use this structure, and omit empty sections:

```markdown
# Release notes - Constellation Mobile SDK vX.Y.Z

## Overview

One short paragraph that summarizes the release.

## Highlights

### <Feature>

What the feature is, who benefits, and a link to the relevant README or docs section.

## Breaking changes

A table with Before (vPrev) and After (vX.Y.Z) columns. State whether each change breaks source compatibility, binary compatibility, or both.

### Migration

Numbered steps with before and after code snippets.

## Bug fixes

- **Area**: what was wrong and what happens now.

## Documentation

## Testing and tooling

For supported components and integration instructions, see the [project README](../../README.md).
```

Rules:

- The project constitution requires every breaking change to document its compatibility impact and include migration guidance.
- Use relative links (`../../core/README.md#anchor`, `../setup-sample-pega-app.md#anchor`). Check that every linked file and heading anchor exists.
- Keep tokens, customer data, and internal URLs out of the notes. Ticket IDs (`BUG-…`, `T-…`) don't belong in the notes.

### 5. Update the version numbers

- Find the current references: `git grep -n -I '<old version>' -- ':!docs/releases' ':!**/responses/**'`.
- Update:
  - `gradle.properties`: `version=X.Y.Z`
  - `docs/how-to-integrate-android-compose.md`: `val sdkVersion = "X.Y.Z"`
  - `docs/how-to-integrate-compose-multiplatform.md`: `val sdkVersion = "X.Y.Z"`
  - any other integration snippet that pins the SDK version.
- Don't change historical statements, such as "Pega 26 support starts with Constellation Mobile SDK v4.1.0" in `README.md`.
- If the supported Pega versions, minimum platform versions, or Gradle or JDK requirements changed, update `README.md` and the integration guides to match.
- Verify with `git --no-pager diff --stat` and `git grep -n 'X.Y.Z' -- gradle.properties docs/how-to-integrate-*.md`.

### 6. Report

Give a short summary that covers:

- the base tag and how many commits the notes cover;
- the chosen version and why, listing the breaking changes for a major version;
- the files created or changed;
- how to publish: run the publish workflow with `version-major` and `version-minor` set to match the release and `custom-release-notes` enabled. Mention that PATCH is auto-incremented, so the script looks for a different notes file if a vX.Y.0 release already exists;
- that nothing was committed, tagged, or pushed.

Only documentation and version strings change, so no build is needed. If any code was touched, run the narrowest relevant Gradle check with the checked-in wrapper, and report the command and its result.
