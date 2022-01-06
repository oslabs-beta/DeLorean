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

function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

function handleResult(result) {
  console.log(result);
  if (result[0] !== undefined) {
    console.log(`result of the eval method: ${result[0]}`);
  } else if (result[1]) {
    handleError(result[1]);
  }
}

const evalExpression =
  "window.document.addEventListener('SvelteDOMInsert', (e) => console.log('SvelteDOMInsert', e.detail))";
//creates a panel within Chrome DevTools named DeLorean
chrome.devtools.panels.create(
  'DeLorean', // title
  './SvelteDeLorean.png', // icon
  './panel.html',
  (panel) => {
    panel.onShown.addListener(() => {
      chrome.devtools.inspectedWindow.eval(
        'if (window.__svelte_devtools_select_element) window.__svelte_devtools_select_element($0)',
        (result, err) => err && console.error(err)
      );
    });
  }
);
