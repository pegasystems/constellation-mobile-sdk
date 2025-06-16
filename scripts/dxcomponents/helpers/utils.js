// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(customParseFormat);
// dayjs.extend(localizedFormat);
// dayjs.extend(relativeTime);

export class Utils {
  lastControlID = 0;

  viewContainerCount = 0;

  consoleKidDump(pConn, level = 1, kidNum = 1) {
    let sDash = '';
    for (let i = 0; i < level; i++) {
      sDash = sDash.concat('-');
    }
    let cName = 'blank';
    let ctxName = '';
    try {
      cName = pConn.getComponentName();
      ctxName = pConn.getContextName();
      console.log(`${sDash}level ${level} component(${kidNum}):${cName} context:${ctxName}`);
      if (pConn.getConfigProps() != null) {
        console.log(`${sDash}configProps:${JSON.stringify(pConn.getConfigProps())}`);
      }
      if (pConn.getRawMetadata() != null) {
        console.log(`${sDash}rawMetadata:${JSON.stringify(pConn.getRawMetadata())}`);
      }

      if (pConn.hasChildren() && pConn.getChildren() != null) {
        console.log(`${sDash}kidCount:${pConn.getChildren().length}`);
        const kids = pConn.getChildren();
        const kidsKeys = Object.keys(kids);

        for (let i = 0, len = kidsKeys.length; i < len; i++) {
          const index = parseInt(kidsKeys[i], 10) + 1;
          const kid = kids[kidsKeys[i]];
          this.consoleKidDump(kid.getPConnect(), level + 1, index);
        }
      }
    } catch (ex) {
      /* empty */
    }
  }

  htmlDecode(sVal) {
    const doc = new DOMParser().parseFromString(sVal, 'text/html');
    return doc.documentElement.textContent;
  }

  getUniqueControlID() {
    const sPrefix = 'control-';

    this.lastControlID++;

    return sPrefix + this.lastControlID.toString();
  }

  getOptionList(configProps, dataObject) {
    const listType = configProps.listType;

    if (listType == null) {
      return [];
    }

    switch (listType.toLowerCase()) {
      case 'associated':
        return this.handleAssociatedList(configProps);
      case 'datapage':
        return this.handleDataPageList(configProps, dataObject);
      default:
        return [];
    }
  }

  handleAssociatedList(configProps) {
    const dataSource = configProps.datasource;

    if (Array.isArray(dataSource)) {
      return dataSource;
    }

    return [];
  }

  handleDataPageList(configProps, dataObject) {
    const dataPage = configProps.datasource;

    if (dataObject && dataObject[dataPage]) {
      // alert('need to handle data page');
      return [];
    }

    let listSourceItems = configProps.listOutput;

    if (typeof dataPage === 'object' && !Array.isArray(listSourceItems)) {
      listSourceItems = dataPage.source ? dataPage.source : [];
    }

    return this.transformListSourceItems(listSourceItems);
  }

  transformListSourceItems(listSourceItems) {
    return (listSourceItems || []).map(item => {
      return { ...item, value: item.text || item.value };
    });
  }

  getInitials(userName) {
    let userInitials = userName;

    if (userName && userName != '') {
      userInitials = userName.charAt(0);

      if (userName.lastIndexOf(' ') > 0) {
        const lastName = userName.substring(userName.lastIndexOf(' ') + 1);
        userInitials += lastName.charAt(0);
      } else if (userName.lastIndexOf('.') > 0) {
        const lastName = userName.substring(userName.lastIndexOf('.') + 1);
        userInitials += lastName.charAt(0);
      }
    } else {
      userInitials = '';
    }

    return userInitials.toUpperCase();
  }

  getImageSrc(name, serverUrl) {
    let iconName = name.replace('pi-', '').replace('pi ', '').trim();
    if (iconName === 'line-chart') {
      iconName = 'chart-line';
    }

    // return serverUrl.concat("assets/icons/").concat(iconName).concat(".svg");
    return this.getIconPath(serverUrl).concat(iconName).concat('.svg');
  }

  getIconPath(serverUrl) {
    return serverUrl.concat('assets/icons/');
  }

  getBooleanValue(inValue) {
    let bReturn = false;

    if (typeof inValue === 'string') {
      if (inValue.toLowerCase() === 'true') {
        bReturn = true;
      }
    } else {
      bReturn = inValue;
    }

    return bReturn;
  }

  getIconFromFileType(fileType) {
    let icon = 'document-doc';
    if (!fileType) return icon;
    if (fileType.startsWith('audio')) {
      icon = 'audio';
    } else if (fileType.startsWith('video')) {
      icon = 'video';
    } else if (fileType.startsWith('image')) {
      icon = 'picture';
    } else if (fileType.includes('pdf')) {
      icon = 'document-pdf';
    } else {
      const [, subtype] = fileType.split('/');
      const foundMatch = sources => {
        return sources.some(key => subtype.includes(key));
      };

      if (foundMatch(['excel', 'spreadsheet'])) {
        icon = 'document-xls';
      } else if (foundMatch(['zip', 'compressed', 'gzip', 'rar', 'tar'])) {
        icon = 'document-compress';
      }
    }

    return icon;
  }

  getIconForAttachment(attachment) {
    let icon;
    switch (attachment.type) {
      case 'FILE':
        icon = this.getIconFromFileType(attachment.mimeType);
        break;
      case 'URL':
        icon = 'chain';
        break;
      default:
        icon = 'document-doc';
    }
    return icon;
  }

  addViewContainer() {
    if (sdkSessionStorage.getItem('viewContainerCount') == null) {
      sdkSessionStorage.setItem('viewContainerCount', '0');
    }

    let count = parseInt(sdkSessionStorage.getItem('viewContainerCount'), 10);
    count++;

    sdkSessionStorage.setItem('viewContainerCount', count.toString());
  }

  removeViewContainer() {
    return;

    let count = parseInt(sdkSessionStorage.getItem('viewContainerCount'), 10);
    count--;

    sdkSessionStorage.setItem('viewContainerCount', count.toString());
  }

  okToAddContainerToVC() {
    if (sdkSessionStorage.getItem('viewContainerCount') == null) {
      sdkSessionStorage.setItem('viewContainerCount', '0');
    }

    const count = parseInt(sdkSessionStorage.getItem('viewContainerCount'), 10);

    return count === 0;
  }

  getUserId = user => {
    let userId = '';
    if (typeof user === 'object' && user !== null && user.userId) {
      userId = user.userId;
    } else if (typeof user === 'string' && user) {
      userId = user;
    }
    return userId;
  };

  static sdkGetAuthHeader() {
    return sdkSessionStorage.getItem('asdk_AH');
  }

  static isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  static hasViewContainer() {
    return sdkSessionStorage.getItem('hasViewContainer') == 'true'
  }

  static setHasViewContainer(hasViewContainer) {
    sdkSessionStorage.setItem('hasViewContainer', hasViewContainer);
  }

  static okToInitFlowContainer() {
    return sdkSessionStorage.getItem('okToInitFlowContainer') == 'true'
  }

  static setOkToInitFlowContainer(okToInit) {
    sdkSessionStorage.setItem('okToInitFlowContainer', okToInit)
  }
}

