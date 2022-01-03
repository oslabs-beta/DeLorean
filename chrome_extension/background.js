let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  // const body = document.getElementsByName('body');
  // body.color = red; 
  // document.body.style.backgroundColor="orange"
  
});


