import { FieldBaseComponent } from './field-base.component.js';

export class DateTimeComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps();
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.propName = this.pConn.getStateProps().value;
    this.props.clockFormat = this.parseClockFormat(configProps.clockFormat);
    this.props.timeZone = PCore.getEnvironmentInfo().getTimeZone() ?? '';

    this.componentsManager.onComponentPropsUpdate(this);
  }

  /**
   *
   * @param clockFormat - '12' or '24'. If device locale should be used then its 'undefined' or '0'.
   *
   * @returns {string} - '12', '24' or '' if device locale should be used.
   */
  parseClockFormat(clockFormat) {
    if (clockFormat === undefined || clockFormat === "0") {
      return "";
    }
    return clockFormat.toString();
  }
}
