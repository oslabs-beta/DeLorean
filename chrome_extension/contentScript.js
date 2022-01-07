const sendMessages = (e) => {
  window.postMessage({body: e });
  console.log(e)
}
const p = (o) => JSON.parse(JSON.stringify(o));
function setupListeners(root) {
  root.addEventListener('SvelteRegisterComponent', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteRegisterBlock', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMInsert', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMRemove', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMRemoveEventListener',(e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMSetData', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMSetProperty', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessages(p(e.detail)));
  root.addEventListener('SvelteDOMRemoveAttribute', (e) => sendMessages(p(e.detail)));
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