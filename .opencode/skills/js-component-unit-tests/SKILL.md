---
name: js-component-unit-tests
description: Rules and guidelines for writing unit tests for JavaScript components in the scripts/ bridge layer
---

## Writing Unit-tests for JS components
1. this.pConn should be mocked
2. PCore should be mocked if needed
3. please test the following methods:
  - init()
  - update(pConn)
  - updateSelf()
  - fieldOnChange(value, event)
  - fieldOnBlur(value,event)
  - onEvent(event)
4. test interactions with this.componentManager
5. test interactions with this.pConn
6. test interactions with PCore (if needed)
7. evaluate props sent in onComponentPropsUpdate() method of componentManager in one test if resonable
