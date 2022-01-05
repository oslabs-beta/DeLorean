// This is a service worker. Its console logs will appear in a service worker console

console.log('console log from global in background.js')

// listen for message from main, open port to contentScript if it's an openPort message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`message received ${sender.tab ? "from a content script: " + sender.tab.url : "from the extension"}`);
  if (request.greeting === "hello") {
    sendResponse({farewell: 'goodbye'});
    console.log('received hello from content script', request);
  }
  if (request.body === 'openPort') {
    console.log('attempting to open port from background.js');
    sendResponse({body: 'trying to open port'});
    openPort();
  }
  console.log(request);
  return true; // this line is needed to set sendReponse to be asynchronous
})

let tabId;
let contentScriptPort;
let mainPort;

async function openPort() {
  // Query tab
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log('tabs', tabs);

  // Open up connection w/ contentScript.js
  const port = chrome.tabs.connect(tabs[0].id, {
      name: "contentScript",
  });
  contentScriptPort = port;
  contentScriptPort.postMessage({
      body: 'test message from background to contentsript over port'
  });
  
  // listen for messages from contentScript. print them and pass along to main
  contentScriptPort.onMessage.addListener(function(msg) {
      if (msg) {
      console.log('this is msg from port (content script): ', msg);
      }
      if (mainPort) {
        mainPort.postMessage({content: `${msg.content ? msg.content : msg}`})
      }
  })
  // chrome.scripting.executeScript({target: {tabId: tabId, allFrames: true}, files: ['contentScript.js']})
};

// listen for port connection from main.js
chrome.runtime.onConnect.addListener((port) => {
  mainPort = port;
  mainPort.onMessage.addListener((msg) => {
    console.log('this is the receiving port in bg.js', port);
    console.log('this is the received message: ', msg);
  });
  mainPort.postMessage({content: 'some content'})
});
