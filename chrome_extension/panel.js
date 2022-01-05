// this works to get some manipulation of the html page within the extension.
// leaving this commented out for now and trying to see if we can follow Reactime
// method of just manipulating the DOM through content scripts

// function handleShown(panel) {
//     const listener = panel.onShown.addListener((window) => {
//         let newEl = window.document.createElement('button');
//         newEl.innerText = 'test4234';
//         newEl.id = 'test';
//         window.document.body.appendChild(newEl);
//     })
//     panel.onShown.removeListener(listener);
//     panel.onHidden.addListener(() => {
//       const test = document.getElementById('test');
      
//     })
//     panel.onShown.addListener((window) => {
//         console.log('running callback');
//         // chrome.devtools.inspectedWindow.eval(
//         //   'window.document.getElementById("target").innerText = "yo"',
//         //   (result, err) => err && console.error(err)
//         // )
//         chrome.devtools.inspectedWindow.getResources((resources) => {
//           console.log(resources);
//           resources[7].getContent((content, encoding) => {
//             console.log(content);
//           })
//           // resources[5].getContent((content, encoding) => {
//           //   console.log(content);
//           // })
//         });
//       })
//     chrome.devtools.panels.DeLorean.createSidebarPane("Test Sidebar",
//     function(sidebar) {
//         // sidebar initialization code here. You can add HTML with .setPage(string), JSON with .setObject(JSON Object), and JS expressions with .setExpression
//        // sidebar.setObject({ some_data: "Some data to show" });
//         sidebar.setPage('./sidebar.html');
// });
// }
  
  // chrome.scripting.executeScript(
  //   () => {
  //     document.body.style.backgroundColor="orange";
  //   }
  // );

//creates a panel within Chrome DevTools named DeLorean
chrome.devtools.panels.create(
  "DeLorean",                 // title
  "./SvelteDeLorean.png",           // icon
  "./panel.html",
  (panel) => {
    //event listener for panel being shown
    panel.onShown.addListener(() =>
      chrome.devtools.inspectedWindow.eval(
        'window.document.addEventListener("SvelteDOMInsert", (e) => console.log("SvelteDOMInsert", e.detail))',
        (result, err) => err && console.error(err)
      )
    )
  }
);
