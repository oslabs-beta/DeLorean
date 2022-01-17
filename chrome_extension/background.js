// This is a background page, previously a service worker. Its console logs will appear in a service worker console
let mainPort;
// listen for message from main, run content script if asked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.body === "runContentScript") {
    sendResponse({ body: "trying to run the content script" });
    chrome.tabs.executeScript({ file: "./contentScript.js" });
  }
  // pass any received message along to main.js
  if (request) {
    if (mainPort) {
      mainPort.postMessage({ body: request.body });
    }
  }
  return true; // this line is needed to set sendReponse to be asynchronous
});

// listen for port connection from main.js
chrome.runtime.onConnect.addListener((port) => {
  mainPort = port;
  mainPort.onMessage.addListener((msg) => {
    if (msg.body === "updateScript") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          body: "UPDATE",
          script: msg.script,
        });
      });
    }
    if (msg.body === "updateCtx") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          body: "TIME_TRAVEL",
          ctxIndex: msg.ctxIndex,
        });
      });
    }
  });
});
