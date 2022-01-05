import { getNode } from '/svelte-listener/svelte.js';
import App from '/src/App.svelte';

console.log('getNode function: ' + getNode);

const connectButton = window.document.getElementById('connectButton')
connectButton.addEventListener('click', () => {
  console.log('attempting to send message to service worker')
  // sending message from chrome devtool extension to background.js to signify open port connection between two files
  chrome.runtime.sendMessage({body: 'openPort'}, (response) => {
    console.log('in the response callback in main.js, got this back: ' + response.body)
  });

  const mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.js

  mainToBgPort.onMessage.addListener((msg, port) => {
    panelP.innerText = panelP.innerText + '\n' + msg.content;
  });
  mainToBgPort.postMessage({content: 'testing port from main to bg service worker'});

})

new App