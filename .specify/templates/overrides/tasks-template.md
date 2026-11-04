# Tasks: [FEATURE NAME]

**Input**: `specs/[###-feature-name]/spec.md` and `plan.md`

## Format

`[ID] [P?] [Story] Description`

- `[P]` means the task can run in parallel with other tasks in the same phase.
- `[Story]` identifies the user story, for example `[US1]`.
- Every task MUST include an exact repository path or command.
- Versioned test tasks MUST name the recorded Pega version and the matching handler/test
  location; preserve shared fixtures unless their provenance establishes a version.
- Mark verification tasks complete only with execution evidence. Record historical results,
  unavailable checks, and unimplemented tests separately; do not equate syntax or compilation
  with runtime acceptance.

## Phase 1: Setup

- [ ] T001 [P] Establish or update fixtures and test inputs at `[path]`.
- [ ] T002 [P] Add required dependency or configuration at `[path]`, if approved by `plan.md`.

## Phase 2: Foundational Work

- [ ] T003 Implement shared model or API changes at `[path]`.
- [ ] T004 Implement platform-specific behavior at `[path]`.

## Phase 3: User Story 1 – [Title]

- [ ] T005 [US1] Implement the primary behavior at `[path]`.
- [ ] T006 [P] [US1] Add unit or component tests at `[path]`.
- [ ] T007 [US1] Add Android, iOS, JVM, or sample coverage at `[path]`, when applicable.

## Phase 4: Documentation and Validation

- [ ] T008 [P] Update README or documentation at `[path]`.
- [ ] T009 Run `./gradlew [task]` and record the result.
- [ ] T010 Review the diff for scope, compatibility, secrets, and generated files.
