
/*
  Note: actions.updateFieldValue and actions.triggerFieldChange causes 2 times StateManager.dispatch is call for each.
  So e.g.: for 'changeNblur' 4 StateManager.dispatch are called and redux sends udate 4 times
*/
export function handleEvent(actions, eventType, propName, value) {
  switch (eventType) {
    case 'change':
      actions.updateFieldValue(propName, value);
      break;
    case 'blur':
      actions.triggerFieldChange(propName, value);
      break;
    case 'changeNblur':
      actions.updateFieldValue(propName, value);
      actions.triggerFieldChange(propName, value);
      break;
    default:
      break;
  }
}
