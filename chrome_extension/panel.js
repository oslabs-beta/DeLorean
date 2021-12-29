// this works to get some manipulation of the html page within the extension.
// leaving this commented out for now and trying to see if we can follow Reactime
// method of just manipulating the DOM through content scripts

// function handleShown(panel) {
//     panel.onShown.addListener((window) => {
//         let newEl = window.document.createElement('button');
//         newEl.innerText = 'test';
//         newEl.id = 'test';
//         window.document.body.appendChild(newEl);
//     })
//   }
  
  
  chrome.devtools.panels.create(
    "DeLorean",                 // title
    "./SvelteDeLorean.png",           // icon
    "./panel.html",
    // (panel) => {
    //     handleShown(panel);
    () => {}
  );

