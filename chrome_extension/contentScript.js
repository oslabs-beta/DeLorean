// SEPARATE EXECUTION CONTEXT FROM BACKGROUND.JS
// the only way to interact with background.js (out dev tool) is with messages
// This is also the place to manipulate the dom

// import { getNode } from 'svelte-listener';

console.log('from content script-- document ready state: ', document.readyState);
console.log('from content script-- chrome object: ', chrome)

// fires emitter to background.js (the callback function parameter is necessary for this method to work)
chrome.runtime.sendMessage({greeting: 'hello'}, (response) => {
  console.log(response.farewell);
});

// listen for port from background.js
let bgPort;
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    console.log('this is the port in content script', port);
    bgPort = port;
    console.log(msg);
  });
});

// listen for clicks on (app's) main page 
window.document.addEventListener('click', (e) => {
  if (bgPort) {
    bgPort.postMessage({content: 'event: ' + JSON.stringify(e)})
  }
})

// let _id =0;
// window.document.addEventListener('click', () => {
//   window.document.addEventListener("SvelteDOMInsert", (e) => {
//     // e.isTrusted = true; (doesn't work, is trusted is a read-only property)
//   console.log('event: ' + JSON.stringify(e))
//   const node = {
//     id: _id++,
//     type:
//       e.detail.node.nodeType == 1
//         ? "element"
//         : e.detail.node.nodeValue && e.detail.node.nodeValue != " "
//         ? "text"
//         : "anchor",
//     detail: e.detail.node,
//     tagName: e.detail.node.nodeName.toLowerCase(),
//     // parentBlock: currentBlock,
//     children: [],
//   };
//   console.log("DOMINSERT NODE: ", node)
// })
//   if (bgPort) {
//     console.log('target element: ', document.getElementById('target'))
//     bgPort.postMessage({body: document.getElementById('target').innerHTML, port: bgPort});
//     console.log('bgPort connected');
//   } else (console.log('bg port is false still'))
// })



  
// if (bgPort) {
//   bgPort.postMessage({body: `SvelteDOMInsert ${node}`});
//   console.log('registered a svelteDOM event');
// } else (console.log('bg port is false still'))

// attempting to create a long-lived connection between contentScript and background.js
// const port = chrome.runtime.connect();
// port.postMessage({msg: 'this one is from a port connection'});