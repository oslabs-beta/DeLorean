const connectButton = window.document.getElementById('connectButton')
connectButton.addEventListener('click', () => {
  console.log('attempting to send message to service worker')
  chrome.runtime.sendMessage({body: 'openPort'}, (response) => {
    console.log('in the response callback in main.js, got this back: ' + response.body)
  });
})

