<script lang="ts">
  // value coming into App.svelte that updates state will be in an array,
  // we need to update our state by adding new elements into the existing array
  import State from "./State.svelte";
  export let snapshots: Array<any> = [];
  let activeIndex: number = 0;
  $: compState = snapshots[activeIndex];

  let mainToBgPort: any;

  // connect devtool to inspected webpage
  function connect() {
    // chrome.runtime.sendMessage({ body: "runContentScript" }, (response) => {});

    mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.js
    mainToBgPort.onMessage.addListener((msg, sender, sendResponse) => {
      if (!snapshots.includes(msg.body)) {
        const moment = [];
        msg.body.componentStates.forEach((state) => {
          const obj = {};
          obj[state[2]] = state[1];
          moment.push(obj);
        });
        snapshots = [...snapshots.slice(0, msg.body.cacheLength), moment];
      }
    });
    let connectButton: any = document.getElementById("connectButton");
    connectButton.style.visibility = "hidden";
  }

  // injects logic into inspected webpage's DOM
  function updateScript(): any {
    console.log(mainToBgPort);
    mainToBgPort.postMessage({
      body: "runContentScript",
    });
    mainToBgPort.postMessage({
      body: "updateScript",
      script: bundleResource,
    });
  }

  // handles click and invokes connect() then updateScript()
  function handleClick() {
    connect();
    updateScript();
  }

  const sendCtxIndex = (i) => {
    mainToBgPort.postMessage({ body: "updateCtx", ctxIndex: i });
  };

  let bundleResource: any;
  chrome.devtools.inspectedWindow.getResources((resources) => {
    // search for bundle file, probably first thing in resources array with type 'script'
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].type === "script") {
        resources[i].getContent((content, encoding) => {
          bundleResource = content;
        });
        break;
      }
    }
  });
</script>

<div>
  <span>
    <button id="connectButton" on:click={handleClick}>Connect</button>
  </span>
</div>
<div id="main-page">
  <div class="buttons">
    {#each snapshots as instance, i}
      <span>
        <button
          class="stateButton {activeIndex === i ? 'active' : ''}"
          id="button{i}"
          on:click={() => {
            sendCtxIndex(i);
            activeIndex = i;
          }}>State {i + 1}</button
        >
      </span><br />
    {/each}
  </div>
  <State {compState} />
</div>

<style>
  #connectButton {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
  }

  #connectButton:hover {
    background-color: rgb(230, 230, 230);
    transition-duration: 0.2s;
  }

  #main-page {
    display: flex;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    /* border-right: 1px grey solid; */
    padding-right: 10px;
    max-height: 100vh;
    overflow: visible scroll;
    min-width: 75px;
    flex-basis: auto;
  }
  .stateButton {
    background-color: rgb(230, 230, 230);
    border: 1px solid white;
    border-radius: 5px;
    width: 100%;
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
