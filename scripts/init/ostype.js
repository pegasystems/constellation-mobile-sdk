export function isIOS() {
    return (typeof iosWVJSEngine !== 'undefined')
}

export function isAndroid() {
    return !isIOS()
}