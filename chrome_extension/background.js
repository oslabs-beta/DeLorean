// This is a service worker. Its console logs will appear in a service worker console
console.log('console log from global in background.js')

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

let contentScriptPortOpen = false;
async function openPort() {
  // Query tab
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log('tabs', tabs);

  // Open up connection
  const port = chrome.tabs.connect(tabs[0].id, {
      name: "contentScript",
  });
  contentScriptPortOpen = true;
  port.postMessage({
      body: 'test message from background to contentsript over port'
  });

  port.onMessage.addListener(function(msg) {
      if (msg) {
      console.log('this is msg from port (content script): ', msg);
      }
  })
}

