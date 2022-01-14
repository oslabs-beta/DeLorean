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
      const cacheStateObj = {};
      let counter = 0;
      let hasWindowListener = false;

      function clone(target) {
        if (typeof target === 'object') {
            let cloneTarget = Array.isArray(target) ? [] : {};
            for (const key in target) {
                cloneTarget[key] = clone(target[key]);
            }
            return cloneTarget;
        } else {
            return target;
        }
      };

      function setupListeners(root) {
        root.addEventListener('SvelteRegisterComponent', (e) => {
          console.log('registered component: ', e.detail.component)
          console.log('this is the cache: ', [...cacheState]);
          // sendMessages(parseEvent(e.detail.component.$$));
          components.push(e.detail.component);
          console.log('this is the components array: ', components)
          counter++;

          if (counter >= 1) {
            // sendMessages(parseEvent(e.detail.component.$$));
            root.addEventListener('SvelteRegisterBlock', (blockEvent) => {
              
              // let currBlock = [blockEvent.detail.ctx];
              // if (!bloc) {
              //   window.addEventListener('click', () => {
                  const curState = [];
                  components.forEach((component) => {
                    // const currCTX = clone(component.$$.ctx);
                    console.log('%c blockEvent', "background: green", blockEvent.detail.ctx)
                    console.log('%c this is what we want to see', 'background: yellow', !blockEvent.detail.ctx.includes("DONOTPUSH"))
                    if (!blockEvent.detail.ctx.includes("DONOTPUSH")) {
                      sendMessages(parseEvent(blockEvent.detail));
                      curState.push([component, blockEvent.detail.ctx]);
                      cacheState.push(curState);
                      
                    } else {
                      console.log('%c cacheState when false', "color: pink", cacheState)
                    }
                  })
                  
              // })
                  // console.log('%c this is the cache2: ', "background: red", [...cacheState]);
                  // hasWindowListener = true;
            // };
            })
              
              
          }

        });

        
    

        // root.addEventListener('SvelteDOMInsert', (e) => sendMessages(parseEvent(e.detail)));
        root.addEventListener('SvelteDOMRemove', (e) => {
          console.log('%c this is the svelteDomRemove emitter being fired', "background: orange", e.detail);
        });
        // root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMRemoveEventListener',(e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetData', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetProperty', (e) => sendMessages(parseEvent(e.detail)));
        // root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessages(parseEvent(e.detail)));
        root.addEventListener('SvelteDOMRemoveAttribute', (e) => {
          console.log('%c this is the svelteDomRemoveAttribute emitter being fired', "background: pink", e.detail);
          sendMessages(parseEvent(e.detail))
        });
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
        // console.log('received in injected script ', messageEvent);
        if (messageEvent.data.body === 'TIME_TRAVEL') {
          const i = messageEvent.data.ctxIndex;
          console.log('this is the cacheState at State # button press', cacheState)
          console.log('cached component & state: ', cacheState[i])
          
          if (cacheState[i]) {
            // if (i < cacheState.length - 1) {
            //   cacheState = cacheState.slice(0, i + 1);
            // }
            cacheState[i].forEach((componentState) => {
              // console.log('%c this is cacheState at the bottom', "background: yellow", cacheState);
              componentState[0].$$.fragment.p([...componentState[1], i, "DONOTPUSH"], [-1])
            })
            // console.log('%c this is the cacheState ', "background: purple; color:white", [...cacheState[i][0][1], "DONOTPUSH"]);
            // cacheState[i][0][0].$$.fragment.p([...cacheState[i][0][1], "DONOTPUSH"], [-1])
            // cacheStateObj[components[0]].$$.fragment.p(cacheStateObj[components[0]][i], [-1])
            // note: updating only the child component doesn't cause extra state update issues
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
