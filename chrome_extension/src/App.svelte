<script>
  // value coming into App.svelte that updates state will be in an array,
  // we need to update our state by adding new elements into the existing array
  import State from "./State.svelte";
  export let snapshot = [];
  let compState = [];
  let activeIndex = -1;

  function handleShowState(i) {
    activeIndex = i;
    let index = 0;
    if (!document.getElementById("state")) {
      let state = document.createElement("ul");
      state.id = "state";
      state.innerHTML = `State ${i + 1}`;
      state.style.fontFamily = "monospace";
      state.style.fontSize = "12px";
      state.style.fontWeight = "bold";
      compState = snapshot[i];
      for (const el of snapshot[i]) {
        if (el) {
          if (Array.isArray(el)) {
            let arrayLI = document.createElement("li");
            arrayLI.innerText = "Array: ";
            arrayLI.style.fontWeight = "normal";
            let newUl = document.createElement("ul");
            newUl.style.listStyleType = "circle";
            for (const data of el) {
              let elData = document.createElement("li");
              elData.innerText = data;
              elData.style.fontFamily = "monospace";
              elData.style.fontSize = "12px";
              elData.style.fontFamily = "12px";
              newUl.appendChild(elData);
            }
            arrayLI.appendChild(newUl);
            state.appendChild(arrayLI);
          } else {
            if (index === snapshot[i].length - 1) {
              let component = document.createElement("li");
              component.innerText = `Most recent change to state: ${el}`;
              component.style.fontWeight = "normal";
              state.appendChild(component);
            } else {
              let component = document.createElement("li");
              component.innerText = el;
              component.style.fontWeight = "normal";
              state.appendChild(component);
            }
          }
        }
        index++;
      }
      document.getElementById("main-page").appendChild(state);
    } else {
      while (state.firstChild) {
        state.removeChild(state.firstChild);
      }
      state.innerHTML = `State ${i + 1}`;
      state.style.fontFamily = "monospace";
      state.style.fontSize = "12px";
      for (const el of snapshot[i]) {
        if (el) {
          if (Array.isArray(el)) {
            let arrayLI = document.createElement("li");
            arrayLI.innerText = "Array: ";
            arrayLI.style.fontWeight = "normal";
            let newUl = document.createElement("ul");
            newUl.style.listStyleType = "circle";
            for (const data of el) {
              let elData = document.createElement("li");
              elData.innerText = data;
              elData.style.fontFamily = "monospace";
              elData.style.fontSize = "12px";
              elData.style.fontWeight = "normal";
              newUl.appendChild(elData);
            }
            arrayLI.appendChild(newUl);
            state.appendChild(arrayLI);
          } else {
            if (index === snapshot[i].length - 1) {
              let component = document.createElement("li");
              component.innerText = `Most recent change to state: ${el}`;
              component.style.fontWeight = "normal";
              state.appendChild(component);
            } else {
              let component = document.createElement("li");
              component.innerText = el;
              component.style.fontWeight = "normal";
              state.appendChild(component);
            }
          }
        }
        index++;
      }
    }
  }

  const connectButton = window.document.getElementById("connectButton");
  connectButton.addEventListener("click", () => {
    // sending message from chrome devtool extension to background.js to signify open port connection between two files
    chrome.runtime.sendMessage({ body: "runContentScript" }, (response) => {
      chrome.runtime.sendMessage({ body: "openPort" }, (response) => {
      });
    });

    const mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.j
    mainToBgPort.onMessage.addListener((msg, port) => {
      if (msg.body.ctx) {
        snapshot.push(msg.body.ctx);
        snapshot = snapshot;
      }
    });
    mainToBgPort.postMessage({ body: "testing port from main to bg" });
    connectButton.style.visibility = "hidden";
  });
</script>

<div id="main-page">
  <div class="buttons">
    {#each snapshot as instance, i}
      <span>
        <button
          class="stateButton {activeIndex === i ? 'active' : ''}"
          id="button{i}"
          on:click={() => handleShowState(i)}>State {i + 1}</button
        >
      </span><br />
    {/each}
  </div>
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
