//creates a panel within Chrome DevTools named DeLorean

chrome.devtools.panels.create(
  'DeLorean', // title
  './SvelteDeLorean.png', // icon
  './panel.html',
  (panel) => {}
);
