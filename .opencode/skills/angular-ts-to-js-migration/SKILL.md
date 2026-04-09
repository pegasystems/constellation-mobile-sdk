---
name: angular-ts-to-js-migration
description: Rules and workflow for migrating Angular TypeScript components to plain ES module JavaScript for the scripts/ bridge layer
---

## Angular TS → JS Migration Rules

When migrating `.ts` (Angular) components to `.js`:
1. Remove all Angular imports, decorators (`@Component`, `@Input`), and TypeScript types
2. Remove interfaces and type annotations
3. Remove all Angular lifecycle interfaces
4. For simple fields components extend `FieldBaseComponent` if possible and reasonable.
5. For Container components extend `ContainerBaseComponent` if possible and reasonable.
6. For rest of components extend `BaseComponent`
7. `ngOnInit` → `init()` with `componentsManager.onComponentAdded(this)`
8. `ngOnDestroy` → `destroy()` with `super.destroy()` and `componentsManager.onComponentRemoved(this)`
9. Merge `onStateChange` into `checkAndUpdate()`
10. `updateSelf` → `#updateSelf()` (private); add `#sendPropsUpdate()` at end
11. Add `update(pConn, ...)` method for external re-rendering
12. Replace `this.pConn$` → `this.pConn`; remove all `as any` casts
13. Normalize quotes to double quotes
14. If there is some external dependency try to look in additional provided ts files and copy its content to migrated js. If nothing is found try to find existing equivalent in js files or create mocked implementation.
15. When migrating parts of code prefer copy-paste over code modification.
16. Never change logic of migrated components.
17. In sdk-pega-component-map.js uncomment migrated component entry in pegaSdkComponentMap and also import line. Fix imported component path.
