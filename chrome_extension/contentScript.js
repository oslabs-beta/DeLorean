// This injects the string iife below directly into the DOM to be executed and listen for events.
// Check the elements tab of the devtools to see the script tag added in

let messageListeners = false;

if (!messageListeners) {
  window.addEventListener(
    "message",
    (messageEvent) => {
      if (messageEvent.data.body !== "TIME_TRAVEL") {
        messageEvent.source == window &&
          chrome.runtime.sendMessage(messageEvent.data);
      }
    },
    false
  );
  messageListeners = true;
}

let index;
// testing update script feature
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  
  // console.log("reached content script from dev tools");
  if(req.body === "TIME_TRAVEL") {
    const i = req.ctxIndex;
    window.postMessage({ body: "TIME_TRAVEL", ctxIndex: i })
  }

  if (req.body === "UPDATE") {
    window.tag = document.createElement("script");
    const root = document.getElementById("root");
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
          if (counter >= 1) {
            root.addEventListener('SvelteRegisterBlock', (blockEvent) => {
                  const curState = [];
                  components.forEach((component) => {
                    if (!blockEvent.detail.ctx.includes("DONOTPUSH")) {
                      sendMessages(parseEvent(blockEvent.detail));
                      curState.push([component, blockEvent.detail.ctx]);
                      cacheState.push(curState);
                    }
                  })
            })
              
              
          }

        });

        
    

        // root.addEventListener('SvelteDOMInsert', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemove', (e) => {
        //   console.log('%c this is the svelteDomRemove emitter being fired', "background: orange", e.detail);
        // });
        // root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemoveEventListener',(e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetData', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetProperty', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemoveAttribute', (e) => {
        //   console.log('%c this is the svelteDomRemoveAttribute emitter being fired', "background: pink", e.detail);
        //   sendMessages(parseEvent(e.detail))
        // });
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
              componentState[0].$$.fragment.p([...componentState[1], i, "DONOTPUSH"], [-1])
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

// App.$$.fragment.p(cacheState[i], [-1])
