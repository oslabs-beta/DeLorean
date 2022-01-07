if (!window.tag) {
		window.tag = document.createElement('script')
		window.tag.text = `
(function () {
  'use strict';

  const sendMessages = (e) => {
    window.postMessage({body: e });
    console.log(e);
  };
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
