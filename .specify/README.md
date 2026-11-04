# Spec-Driven Development Scaffolding

This directory contains the repository-specific Spec-Kit memory, templates, scripts, and metadata for the Constellation Mobile SDK. The repository uses the GitHub Copilot skills integration with shell helpers.

## Feature Layout

Create one directory per feature under `specs/`:

```text
specs/<feature>/
├── spec.md
├── research.md          # when clarification or investigation is needed
├── plan.md
├── tasks.md
├── data-model.md        # when the feature introduces or changes data
├── quickstart.md        # when an integration or usage guide is useful
├── contracts/           # when module or process contracts are involved
└── checklists/          # when a requirements review checklist is requested
```

## Templates

`.specify/templates/*.md` are the **pristine, upstream Spec-Kit templates** installed by the CLI (`spec-template.md`, `plan-template.md`, `tasks-template.md`, `checklist-template.md`, `constitution-template.md`). Their SHA-256 hashes are tracked in `.specify/integrations/speckit.manifest.json` and `.specify/memory/.constitution-template.json`. **Do not edit these files directly** — doing so breaks drift detection and future `specify` upgrades.

Repository-specific customizations to the spec/plan/tasks/checklist templates live in `.specify/templates/overrides/`, following Spec-Kit's built-in override resolution (`.specify/scripts/bash/common.sh:resolve_template`). Skills automatically prefer the override when one exists, falling back to the core template otherwise.

`research-template.md`, `data-model-template.md`, `quickstart-template.md`, and `templates/contracts/README.md` are supplementary reference templates for this repository (not part of core Spec-Kit and not resolved by `resolve_template`); copy them into a feature directory manually when useful.

The helper scripts under `.specify/scripts/bash/` create and resolve feature artifacts.

## Workflow

Use the GitHub Copilot skills in `.github/skills/` in this order:

1. Read the existing constitution; use `/speckit-constitution` only for an intentional amendment.
2. `/speckit-specify`
3. `/speckit-clarify` when requirements need clarification
4. `/speckit-plan`
5. `/speckit-tasks`
6. `/speckit-analyze` after spec, plan, and tasks exist
7. `/speckit-implement`
8. `/speckit-converge` when implementation leaves documented work incomplete

Use `/speckit-checklist` when a requirements checklist is useful.

## Selecting an Existing Feature

Helpers resolve `SPECIFY_FEATURE_DIRECTORY` first, then `.specify/feature.json`; they do not
infer feature scope from the checked-out Git branch. A branch can affect more than one spec.
For a read-only check of another feature, use both overrides so the persisted selection
remains unchanged:

```bash
SPECIFY_FEATURE_DIRECTORY=specs/001-compose-test-setup \
SPECIFY_FEATURE_NO_PERSIST=1 \
.specify/scripts/bash/check-prerequisites.sh --json --require-spec --require-tasks --include-tasks
```

When synchronizing specs after existing code changes, identify the record as retrospective,
link the implementation evidence, and keep unexecuted acceptance checks open. Historical
test reports must not be presented as fresh verification.

The project metadata records the Copilot integration and Spec-Kit version. The bundled Spec-Kit workflow descriptor is available under `.specify/workflows/`; it is not a GitHub Actions workflow.
