// document.onload(() => {
//   let newEl = window.document.createElement('button');
//   newEl.innerText = 'test1';
//   newEl.id = 'test1';
//   window.document.body.appendChild(newEl);
// });


// console.log('testing from main.js')


// window.addEventListener('DOMContentLoaded', () => {
//   let newEl = window.document.createElement('button');
//   newEl.innerText = 'test1';
//   newEl.id = 'test1';
//   window.document.body.appendChild(newEl);
//   console.log('DOM fully loaded and parsed');
// });

function handleShown(panel) {
    // panel.onShown.addListener((window) => {
    //     let newEl = window.document.createElement('button');
    //     newEl.innerText = 'test3534';
    //     newEl.id = 'test';
    //     window.document.body.appendChild(newEl);
    //   })
    //   panel.onShown.addListener(() => {
    //   console.log('running callback');
    //   chrome.devtools.inspectedWindow.eval(
    //     'console.log($0)',
    //     (result, err) => err && console.error(err)
    //   )
    // })
}

chrome.devtools.panels.create(
    "DeLorean",                       // title
    "./SvelteDeLorean.png",           // icon
    "./panel.html",                   // html page
    (panel) => {                      // onload function
         handleShown(panel);
      // () => {}
    }
  );

// window.onload = () => {
//   let newEl = window.document.createElement('button');
//   newEl.innerText = 'test1';
//   newEl.id = 'test1';
//   window.document.body.appendChild(newEl);
//   console.log('DOM fully loaded and parsed');
// }