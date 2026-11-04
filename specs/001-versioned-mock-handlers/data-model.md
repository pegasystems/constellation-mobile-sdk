# Handler model

- A public handler has one selected internal version delegate.
- An assignment delegate resolves open/action requests or reports an unhandled route.
- A case delegate maps case-type IDs to relative fixture paths and optionally handles refresh/delete requests.
- Versioned paths always use the selected `PegaVersion.fixtureDirectory`.
- Only the Pega 25 assignment delegate carries state: forward actions push prior steps and previous actions pop them. Each delegate instance has its own stack.
- Existing `MockRequest`, `MockResponse`, and `PegaVersion` types are unchanged.
