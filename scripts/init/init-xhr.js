import { bridge } from "../bridge/native-bridge.js";

export function overrideXHRForRequestBody() {
    window.XMLHttpRequest = newXHRForRequestBody;
  }
  
  var oldXHR = window.XMLHttpRequest;
  function newXHRForRequestBody() {
    var oldXHRObj = new oldXHR();
  
    oldXHRObj.send = function (body) {
      if (body !== undefined && body !== null) {
        console.log("sending request body: ", body);
        bridge.setRequestBody(body);
      }
      return oldXHR.prototype.send.apply(this, arguments);
    };
  
    return oldXHRObj;
  }
  