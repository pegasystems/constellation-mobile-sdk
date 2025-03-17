export class ErrorBoundaryComponent {
  message;

  localizedVal = window.PCore.getLocaleUtils().getLocaleValue;
  localeCategory = 'Messages';

  init() {
    console.log("Error component inited")
  }
}
