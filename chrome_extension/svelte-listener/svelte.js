export function nothing() {};

const sendMessage = (e) => {
  window.postMessage({body: e });
  console.log(e)
}
const parse = (o) => JSON.parse(JSON.stringify(o));
function setup(root) {
  root.addEventListener('SvelteRegisterComponent', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteRegisterBlock', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteDOMInsert', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteDOMRemove', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteDOMAddEventListener', (e) => sendMessage(parse(e.detail)));
  root.addEventListener(
    'SvelteDOMRemoveEventListener',
    (e) => sendMessage(parse(e.detail))
  );
  root.addEventListener('SvelteDOMSetData', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteDOMSetProperty', (e) => sendMessage(parse(e.detail)));
  root.addEventListener('SvelteDOMSetAttribute', (e) => sendMessage(oarse(e.detail)));
  root.addEventListener('SvelteDOMRemoveAttribute', (e) => sendMessage(parse(e.detail)));
}

setup(window.document);
for (let i = 0; i < window.frames.length; i++) {
  const frame = window.frames[i];
  const root = frame.document;
  setup(root);
  const timer = setInterval(() => {
    if (root == frame.document) return;
    clearTimeout(timer);
    setup(frame.document);
  }, 0);
  root.addEventListener('readystatechange', (e) => clearTimeout(timer), {
    once: true,
  });
}
