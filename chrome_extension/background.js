// This is a background page, previously a service worker. Its console logs will appear in a service worker console

console.log("console log from global in background.js");

let mainPort;
// listen for message from main, run content script if asked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    `message received ${
      sender.tab
        ? "from a content script: " + sender.tab.url
        : "from the extension"
    }`
  );
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
  console.log(request);
  return true; // this line is needed to set sendReponse to be asynchronous
});

// listen for port connection from main.js
chrome.runtime.onConnect.addListener((port) => {
  mainPort = port;
  mainPort.onMessage.addListener((msg) => {
    console.log("this is the receiving port in bg.js", port);
    console.log("this is the received message: ", msg);
    if (msg.body === "updateScript") {
      console.log(
        "we got the message to updateScript and now we're sending a message to the content script"
      );
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          body: "UPDATE",
          script: msg.script,
        });
      });
    }
  });
  mainPort.postMessage({ body: "some content" });
});
