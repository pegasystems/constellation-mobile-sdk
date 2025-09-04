import { ReferenceComponent } from './reference.component.js';
import { ContainerBaseComponent } from './container-base.component.js';

export class DefaultFormComponent extends ContainerBaseComponent {
  instructions;
  props;

  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.type = "DefaultForm"
  }

  init() {
    this.componentsManager.onComponentAdded(this);

    const configProps = this.pConn.getConfigProps();
    this.instructions = this.getInstructions(this.pConn, configProps?.instructions);
    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate();
  }

  destroy() {
    // prevents sending fields from previous steps on next submit see: TASK-1776419 pulse
    PCore.getContextTreeManager().removeContextTreeNode(this.pConn.getContextName());
    this.destroyChildren();
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    this.pConn = pConn;
    const configProps = this.pConn.getConfigProps();
    this.instructions = this.getInstructions(this.pConn, configProps?.instructions);
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());

    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate();
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    this.props = {
       children: this.getChildrenComponentsIds(),
       instructions: this.instructions || ''
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  /**
   * Determine if the current view is the view of the case step/assignment.
   * @param {Function} pConnect PConnect object for the component
   */
  getIsAssignmentView(pConnect) {
    // Get caseInfo content from the store which contains the view info about the current assignment/step
    // TODO To be replaced with pConnect.getCaseInfo().getCurrentAssignmentView when it's available
    const assignmentViewClass = pConnect.getValue(PCore.getConstants().CASE_INFO.CASE_INFO_CLASSID);
    const assignmentViewName = pConnect.getValue(PCore.getConstants().CASE_INFO.ASSIGNMENTACTION_ID);
    const assignmentViewId = `${assignmentViewName}!${assignmentViewClass}`;
    const currentViewId = `${pConnect.getCurrentView()}!${pConnect.getCurrentClassID()}`;
    return assignmentViewId === currentViewId;
  }

  /**
   * A hook that gets the instructions content for a view.
   * @param {Function} pConnect PConnect object for the component
   * @param {string} [instructions="casestep"] 'casestep', 'none', or the html content of a Rule-UI-Paragraph rule (processed via core's paragraph annotation handler)
   */
  getInstructions(pConnect, instructions = 'casestep') {
    const caseStepInstructions = PCore.getConstants().CASE_INFO.INSTRUCTIONS && pConnect.getValue(PCore.getConstants().CASE_INFO.INSTRUCTIONS);
    const isCurrentAssignmentView = this.getIsAssignmentView(pConnect);
    if (instructions === 'casestep' && isCurrentAssignmentView && caseStepInstructions?.length > 0) {
      return caseStepInstructions;
    }
    if (instructions === 'none') {
      return undefined;
    }
    // If the annotation wasn't processed correctly, don't return any instruction text
    if (instructions?.startsWith('@PARAGRAPH')) {
      return undefined;
    }
    // Custom instructions from the view
    // The raw metadata for `instructions` will be something like '@PARAGRAPH .SomeParagraphRule' but
    // it is evaluated by core logic to the content
    if (instructions !== 'casestep' && instructions !== 'none') {
      return instructions;
    }
    return undefined;
  }
}
