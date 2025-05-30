import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { BaseComponent } from '../base.component.js';

// interface DefaultFormProps {
//   // If any, enter additional props that only exist on this component
//   NumCols: string;
//   instructions: string;
// }

export class DefaultFormComponent extends BaseComponent{
  arChildren$ = [];
  childrenComponents = [];
  instructions;
  props;

  constructor(componentsManager, pConn, childrenPConns) {
    super(componentsManager, pConn);
    this.type = "DefaultForm"
    this.arChildren$ = childrenPConns;
  }

  init() {
    this.componentsManager.onComponentAdded(this);

    const configProps = this.pConn.getConfigProps();
    this.instructions = this.getInstructions(this.pConn, configProps?.instructions);
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.arChildren$);
    const reconciledComponents = this.componentsManager.reconcileChildren(this);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate();
  }

  destroy() {
    // copied from form-template-base.ts
    // this was present in angular sdk but missing in react-sdk, will comment it out for now
    // PCore.getContextTreeManager().removeContextTreeNode(this.pConn.getContextName());
    Utils.destroyChildren(this);
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn, childrenPConns) {
    this.pConn = pConn;
    this.arChildren$ = childrenPConns;

    const configProps = this.pConn.getConfigProps();
    this.instructions = this.getInstructions(this.pConn, configProps?.instructions);

    const oldChildren = this.arChildren$;
    // this.arChildren$ = ReferenceComponent.normalizePConnArray(children[0].getPConnect().getChildren());
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.arChildren$);

    const reconciledComponents = this.componentsManager.reconcileChildren(this);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate();
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    const childrenComponents = this.childrenComponents
    this.props = {
       children: Utils.getChildrenComponentsIds(childrenComponents),
       instructions: this.instructions || ''
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  // copied from template-utils.ts
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

    // Get the info about the current view from pConnect
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

    // Determine if this view is the current assignment/step view
    const isCurrentAssignmentView = this.getIsAssignmentView(pConnect);

    // Case step instructions
    if (instructions === 'casestep' && isCurrentAssignmentView && caseStepInstructions?.length) {
      return caseStepInstructions;
    }

    // No instructions
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
