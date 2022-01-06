<script>
  // value coming into App.svelte that updates state will be in an array,
  // we need to update our state by adding new elements into the existing array
  export let snapshot = [];
  function handleShowState(i) {
    if (!document.getElementById("state")) {
      let state = document.createElement("p");
      state.id = "state";
      state.innerHTML = snapshot[i];
      document.body.appendChild(state);
    } else {
      document.getElementById("state").innerHTML = snapshot[i];
    }
    const test123 = document.getElementById(`instance${i}`);
  }

  const connectButton = window.document.getElementById("connectButton");
  connectButton.addEventListener("click", () => {
    // console.log('attempting to send message to service worker')
    // sending message from chrome devtool extension to background.js to signify open port connection between two files
    chrome.runtime.sendMessage({ body: "runContentScript" }, (response) => {
      // console.log('in the response callback in main.js, got this back: ' + response.body);
      chrome.runtime.sendMessage({ body: "openPort" }, (response) => {
        // console.log('in the response callback in main.js, got this back: ' + response.body)
      });
    });

    const mainToBgPort = chrome.runtime.connect(); // attempt to open port to background.j
    mainToBgPort.onMessage.addListener((msg, port) => {
      if (msg.body.ctx) {
        // panelP.innerText = panelP.innerText + "\n" + msg.body.ctx;
        snapshot.push(msg.body.ctx);
        console.log("snapshot array in App.svelte", snapshot);
        snapshot = snapshot;
      }
    });
    mainToBgPort.postMessage({ body: "testing port from main to bg" });
    connectButton.style.visibility = "hidden";
  });
</script>

<div class="main-page">
  {#each snapshot as instance, i}
    <span>
      <button id="button{i}" on:click={() => handleShowState(i)}
        >State {i + 1}</button
      >
    </span><br />
  {/each}
</div>
