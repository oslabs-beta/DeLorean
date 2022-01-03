// SEPARATE EXECUTION CONTEXT FROM BACKGROUND.JS
// the only way to interact with background.js (out dev tool) is with messages

// This is also the place to manipulate the dom
console.log('this is from the content scripts1')

console.log(document.readyState);
console.log('chrome', chrome)


// fires emitter to background.js (the callback function parameter is necessaryfor this method to work)
chrome.runtime.sendMessage({greeting: 'hello'}, (response) => {
  console.log('message sent from content script')
});