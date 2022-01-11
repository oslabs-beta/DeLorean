// This injects the string iife below directly into the DOM to be executed and listen for events.
// Check the elements tab of the devtools to see the script tag added in

let messageListeners = false;
if (!messageListeners) {
  window.addEventListener(
    "message",
    (messageEvent) => {
      console.log(messageEvent);
      messageEvent.source == window &&
        chrome.runtime.sendMessage(messageEvent.data);
    },
    false
  );
  messageListeners = true;
}

// testing update script feature
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("reached content script from dev tools");
  if (req.body === "UPDATE") {
    // document.children[0].removeChild(window.tag);
    window.tag2 = document.createElement("script");
    const root = document.getElementById("root");
    while (root.children.length) {
      root.children[0].remove();
    }
    window.tag2.text = `(function () { 
      'use strict';
      const sendMessages = (eventDetail) => {
        window.postMessage({ body: eventDetail });
        console.log(eventDetail);
      };
      const parseEvent = (event) => JSON.parse(JSON.stringify(event));
      const cacheState = [];
    function setupListeners(root) {
      root.addEventListener('SvelteRegisterComponent', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteRegisterBlock', (e) => {
        cacheState.push(e.detail.ctx);
        console.log('this is cacheState: ', cacheState);
        sendMessages(parseEvent(e.detail))
      });
      root.addEventListener('SvelteDOMInsert', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMRemove', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMRemoveEventListener',(e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMSetData', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMSetProperty', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessages(parseEvent(e.detail)));
      root.addEventListener('SvelteDOMRemoveAttribute', (e) => sendMessages(parseEvent(e.detail)));
    }
    setupListeners(window.document);
    for (let i = 0; i < window.frames.length; i++) {
      const frame = window.frames[i];
      const root = frame.document;
      setupListeners(root);
      const timer = setInterval(() => {
        if (root == frame.document) return;
        clearTimeout(timer);
        setupListeners(frame.document);
      }, 0);
      root.addEventListener('readystatechange', (e) => clearTimeout(timer), {
        once: true,
      });
    }
    ${req.script};
    })();
    console.log('testing');
    `;
    document.children[0].append(window.tag2);
    // sendResponse({body: 'executeScriptAgain'});
  }
});

// App.$$.fragment.p([ctx], [dirtynum])