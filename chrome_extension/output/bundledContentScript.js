if (!window.tag) {
		window.tag = document.createElement('script')
		window.tag.text = `
(function () {
  'use strict';

  const sendMessage = (e) => {
    window.postMessage({body: e });
    console.log(e);
  };
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

})();
`
		if (window.sessionStorage.SvelteDevToolsProfilerEnabled === "true") window.tag.text = window.tag.text.replace('let profilerEnabled = false;', '$&\nstartProfiler();')
		document.children[0].append(window.tag)
		const sendMessage = chrome.runtime.sendMessage
		const postMessage = window.postMessage.bind(window)
		chrome.runtime.onMessage.addListener((message, sender) => {
			const fromBackground = sender && sender.id === chrome.runtime.id
			if (!fromBackground) {
				console.error('Message from unexpected sender', sender, message)
				return
			}
			switch (message.type) {
				case 'startProfiler':
					window.sessionStorage.SvelteDevToolsProfilerEnabled = "true"
					break
				case 'stopProfiler':
					// fallthrough
				case 'clear':
					delete window.sessionStorage.SvelteDevToolsProfilerEnabled
					break
			}
			postMessage(message)
		})
		window.addEventListener(
			'message',
			e => e.source == window && sendMessage(e.data),
			false
		)
		window.addEventListener('unload', () => sendMessage({ type: 'clear' }))
	}
