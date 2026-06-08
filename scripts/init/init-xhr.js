import { bridge } from "../bridge/native-bridge.js";

export function overrideXHRForRequestBody() {
    window.XMLHttpRequest = newXHRForRequestBody;
}

const oldXHR = window.XMLHttpRequest;
const REQUEST_BODY_ID_HEADER = "X-Request-Body-Id";
let requestBodyCounter = 0;

function createRequestBodyId() {
    requestBodyCounter += 1;
    return `xhr-${Date.now()}-${requestBodyCounter}`;
}

function newXHRForRequestBody() {
    const oldXHRObj = new oldXHR();

    oldXHRObj.send = function (body) {
        if (body !== undefined && body !== null) {
            console.log("[XHR]", "sending request body: ", body);
            const requestId = createRequestBodyId();
            oldXHRObj.setRequestHeader(REQUEST_BODY_ID_HEADER, requestId);
            bridge.setRequestBody(requestId, body);
        }
        return oldXHR.prototype.send.apply(this, arguments);
    };

    return oldXHRObj;
}
