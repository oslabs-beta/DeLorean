<script>
  // value coming into App.svelte that updates state will be in an array,
  // we need to update our state by adding new elements into the existing array
  import State from "./State.svelte";
  export let snapshot = [];
  let activeIndex = 0;
  $: compState = snapshot[activeIndex];

  const connectButton = window.document.getElementById("connectButton");
  let mainToBgPort;
  connectButton.addEventListener("click", () => {
    // sending message from chrome devtool extension to background.js to signify open port connection between two files
    chrome.runtime.sendMessage({ body: "runContentScript" }, (response) => {
      // chrome.runtime.sendMessage({ body: "openPort" }, (response) => {});
    });

    mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.j
    mainToBgPort.onMessage.addListener((msg, sender, sendResponse) => {
      if (!snapshot.includes(msg.body.ctx)) {
        snapshot.push(msg.body.ctx);
        snapshot = snapshot;
      }
    });
    mainToBgPort.postMessage({ body: "testing port from main to bg" });
    connectButton.style.visibility = "hidden";
  });

  // experimental update of script
  const secondButton = window.document.getElementById("secondButton");
  secondButton.addEventListener("click", () => {
    mainToBgPort.postMessage({ body: "updateScript", script: bundleResource });
    secondButton.style.visibility = "hidden";
  })
  // experimental time travel to reset to stx at index i
  const sendCtxIndex = (i) => {
    mainToBgPort.postMessage({ body: "updateCtx", ctxIndex: i });
  }
  
  let bundleResource;
  chrome.devtools.inspectedWindow.getResources((resources) => {
    // search for bundle file
    //   possibly first thing in array with type = script ??
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].type === 'script') {
        resources[i].getContent((content, encoding) => {
          bundleResource = content;
        });
        break;
      }
  }});
  </script>

<div id="main-page">
  <div class="buttons">
    {#each snapshot as instance, i}
      <span>
        <button
          class="stateButton {activeIndex === i ? 'active' : ''}"
          id="button{i}"
          on:click={() => { sendCtxIndex(i); activeIndex = i} }>State {i + 1}</button
        >
      </span><br />
    {/each}
  </div>
  <State {compState} />
</div>

<style>
  #main-page {
    display: flex;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    border-right: 1px grey solid;
    padding-right: 10px;
  }
  .stateButton {
    background-color: rgb(230, 230, 230);
    border: 1px solid white;
    border-radius: 5px;
    width: 120px;
    height: 40px;
    font-family: monospace;
    font-size: 12px;
    color: rgb(100, 100, 100);
  }

  .stateButton:hover {
    background-color: gray;
    color: white;
    transition: 0.5s;
  }

  .active {
    background-color: rgb(201, 201, 201);
    box-shadow: 3px 3px rgb(231, 231, 231);
    transform: translateY(2px);
  }
</style>
