# Research and Clarifications

- **Decision**: Use Pega 26.1. **Rationale**: Explicit user confirmation corrects 16.1. **Alternative**: Adding a new major version is not authorized or needed.
- **Decision**: Initially select A4 on Table. **Rationale**: User confirmation and HAR entry 17 agree. **Alternative**: C-Class would contradict the preceding submission.
- **Decision**: Preserve the six navigation names exactly: Combobox, Dropdown, Table, Simple Table, Cards, Readonly. **Rationale**: Current steps in response navigation. Refresh responses have no navigation; their action identifies the step.
- **Decision**: Use case type `OR97MD-Constell_1-Work-DataReferenceTest` and assignment `ASSIGN-WORKLIST OR97MD-CONSTELL_1-WORK D-2004!DATAREFERENCESINGLE_FLOW`. **Rationale**: Recorded creation and assignment requests.
- **Decision**: Preserve separate D_CarList projections for dropdown and table. **Rationale**: HAR entries 9/15 request Model+pyGUID; entries 20/21 request thirteen display fields plus pyGUID.
- **Decision**: Reuse recorded inline Cards data. **Rationale**: Entry 25 embeds its card dataset; do not invent additional calls.
- **Decision**: Normalize operator identity using checked-in dx/26.1/data_views/D_pxBootstrapConfig.json. **Rationale**: Existing profile must remain consistent.
- **Decision**: Keep this test-only. **Rationale**: Existing components and shared lifecycle are sufficient; no production API or supported-version claims change.
- **Decision**: Replay the five case summaries in recorded order using an instance-local queue in DxCases26Handler. **Rationale**: The same GET URL returns different responses after each submission; Compose setup creates a fresh interceptor/delegate for each attempt. **Alternative**: Shared global state would leak between tests.
- **Decision**: Match table rows using model-cell layout positions and scroll columns/cells into view. **Rationale**: Instrumented semantics show row controls and cell texts as siblings, plus separate measurement-only copies. Unclipped layout positions distinguish real rows even during horizontal scrolling. **Alternative**: Descendant matching cannot identify these rows; selecting the first global text could verify the wrong row.
