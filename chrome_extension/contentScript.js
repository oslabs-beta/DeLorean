// This injects the string iife below directly into the DOM to be executed and listen for events.
// Check the elements tab of the devtools to see the script tag added in

if (!window.tag) {
  // creating a script tag to be injected into the browser's DOM where the application is running
  window.tag = document.createElement("script");
  // adding the following code to the script tag so that we can record the events that Svelte emits
  // the code is added as an IIFE
  window.tag.text = `
(function () {
'use strict';

const sendMessages = (eventDetail) => {
  window.postMessage({ body: eventDetail });
  console.log(eventDetail);
};

const parseEvent = (event) => JSON.parse(JSON.stringify(event));

function setupListeners(root) {
  root.addEventListener('SvelteRegisterComponent', (e) => sendMessages(parseEvent(e.detail)));
  root.addEventListener('SvelteRegisterBlock', (e) => sendMessages(parseEvent(e.detail)));
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

})();
`;
  document.children[0].append(window.tag);

  window.addEventListener(
    "message",
    (messageEvent) => {
      console.log(messageEvent);
      messageEvent.source == window &&
        chrome.runtime.sendMessage(messageEvent.data);
    },
    false
  );
}

// testing update script feature
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("reached content script from dev tools");
  if (req.body === "UPDATE") {
    // document.children[0].removeChild(window.tag);
    window.tag2 = document.createElement("script");
    window.tag2.text = `(function () { 
    'use strict'; 
    ${req.script};
    })();
    console.log('testing');
    `;
    document.children[0].append(window.tag2);
    // sendResponse({body: 'executeScriptAgain'});
  }
});
