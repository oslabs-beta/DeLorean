// This injects the string iife below directly into the DOM to be executed and listen for events.
// Check the elements tab of the devtools to see the script tag added in

let messageListeners = false;

if (!messageListeners) {
  window.addEventListener(
    'message',
    (messageEvent) => {
      if (messageEvent.data.body !== 'TIME_TRAVEL') {
        messageEvent.source == window &&
          chrome.runtime.sendMessage(messageEvent.data);
      }
    },
    false
  );
  messageListeners = true;
}

let index = 0;
// testing update script feature
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  // console.log("reached content script from dev tools");
  if (req.body === 'TIME_TRAVEL') {
    const i = req.ctxIndex;
    window.postMessage({ body: 'TIME_TRAVEL', ctxIndex: i });
  }

  if (req.body === 'UPDATE') {
    window.tag = document.createElement('script');
    const root = document.getElementById('root');
    while (root.children.length) {
      root.children[0].remove();
    }

    window.tag.text = `(function () { 
      'use strict';
      const sendMessages = (eventDetail) => {
        window.postMessage({ body: eventDetail });
      };

      const parseEvent = (event) => JSON.parse(JSON.stringify(event));
      let cacheState = [];
      const components = [];
      let counter = 0;

      function setupListeners(root) {
        root.addEventListener('SvelteRegisterComponent', (e) => {
          components.push(e.detail.component);
          counter++;
          
          // TOFIX: counter is implemented to avoid excessive event listeners attached to root to account for the process of onboarding multiple componenets, but it is hard coded for single component right now
          if (counter >= 1) {
            root.addEventListener('SvelteRegisterBlock', (blockEvent) => {
              const curState = [];
              components.forEach((component) => {
                if (!blockEvent.detail.ctx.includes("DONOTPUSH")) {
                  curState.push([component, blockEvent.detail.ctx]);
                  cacheState.push(curState);
                  // cacheState[cacheState.length - 1][0][0].$$.fragment.p([...cacheState[cacheState.length - 1][0][1], "DONOTPUSH"], [-1])
                  sendMessages(parseEvent({ctx : [...component.$$.ctx]}));
                }
              })
            })
          }
        });
        // // These event listeners aren't being used in this version, but could provide valuable data for future versions of this product
        // root.addEventListener('SvelteDOMInsert', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemove', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemoveEventListener',(e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetData', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetProperty', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemoveAttribute', (e) => sendMessages(parseEvent(e.detail)));
      };

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

    window.addEventListener(
      "message",
      (messageEvent) => {
        if (messageEvent.data.body === 'TIME_TRAVEL') {
          const i = messageEvent.data.ctxIndex;
          if (cacheState[i]) {
            cacheState[i].forEach((componentState) => {
              componentState[0].$$.fragment.p([...componentState[1], "DONOTPUSH"], [-1])
            })
          }
        }
      },
      false
    );
    })();
    `;
    document.children[0].append(window.tag);
  }
});
