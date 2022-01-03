// This is a service worker. Its console logs will appear in a service worker console
console.log('console log from global in background.js')

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
  if (request.greeting === "hello") {
    console.log('received hello from content script')
  }
})
