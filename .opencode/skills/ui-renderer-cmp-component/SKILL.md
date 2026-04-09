---
name: ui-renderer-cmp-component
description: Rules and guidelines for creating component renderers in the ui-renderer-cmp Kotlin module
---

### Creating component renderers in ui-remderer-cmp kotlin module

Components renderers are in 'ui-renderer-cmp' module in commonMain

1. Create renderer file in appropriate folder with name '<ComponentType>Renderer'
    - Container and template renderers -> 'containers' folder
    - Form fields renderers -> 'fields' folder
    - Other renderers -> 'widgets'
2. Create class with name '<ComponentType>Renderer'
3. Extend ComponentRenderer with appropriate component template type.
4. Add 'Render' extension function implementation.
   - This function will contain actual Compose Multiplatform UI.
   - It should be using CMP UI components from 'ui-components-cmp' module
   - If none of the CMP UI components can be used, standard CMP components may be used.
   - If added 'Render' content can be considered as separate CMP UI component and can be potentially used by other renderers please add it to 'ui-components-cmp' module. (Load the `ui-components-cmp-component` skill for the full guidelines and rules.)
5. Add entry in 'DefaultRenderers' map. Entries are sorted alphabetically.