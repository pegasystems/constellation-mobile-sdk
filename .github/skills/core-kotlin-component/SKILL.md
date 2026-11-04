---
name: core-kotlin-component
description: Rules and guidelines for creating components in the core Kotlin module
---
### Creating components in core kotlin module
Core components are in 'core' module in commonMain in components folder

1. Create component file in appropriate folder with name equal to component type.
   - Container and template components -> 'containers' folder
   - Form fields components -> 'fields' folder
   - Other components -> 'widgets'
2. Create class with name '<ComponentType>Component'
3. Extend and implement appropriate base classes and interfaces:
   - For containers containing childern extend ContainerComponent
   - For fields extend FieldComponent
   - For components containing options extend SelectableComponent
   - In other cases extend BaseComponent
   - For components with 'visible' property implement HideableComponent (if none of its parent classes implements it)
4. When creating component's class properties look into component related javascript file to this.props object to see which properties are being sent via bridge to native side
5. Each class property which will contain prop send from js should be mutable state
6. Js props should be read in 'applyProps' function
7. Any UI event should be handled by component class method (e.g.: 'updateValue' in FieldComponent or 'onOptionClick' in CheckboxComponent).
   - Method should call context.sendComponentEvent with ComponentEvent object as argument.
   - ComponentEvent object should be created in component class method. If event is used by more then one component then creation method can be moved to ComponentEvent companion object.
   - ComponentEvent should be filled with appropriate type and componentData. Optional eventData can be filled.
8. Add new type in ComponentTypes object
9. Add bew entry in DefaultDefinitions (it is alphabetically ordered by component type value)