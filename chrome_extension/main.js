// const connectButton = window.document.getElementById('connectButton')
// connectButton.addEventListener('click', () => {
//   console.log('attempting to send message to service worker')
//   // sending message from chrome devtool extension to background.js to signify open port connection between two files
//   chrome.runtime.sendMessage({body: 'runContentScript'}, (response) => {
//     console.log('in the response callback in main.js, got this back: ' + response.body);
//   chrome.runtime.sendMessage({body: 'openPort'}, (response) => {
//     console.log('in the response callback in main.js, got this back: ' + response.body)
//   });
// });
  
//   const mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.j
//   mainToBgPort.onMessage.addListener((msg, port) => {
//     if (msg.body.ctx) {
//       panelP.innerText = panelP.innerText + '\n' + msg.body.ctx;
//       }
//   });
//   mainToBgPort.postMessage({body: 'testing port from main to bg'});
// });
// export default test;
