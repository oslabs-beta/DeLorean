<script lang="ts">
  let mph: number = 30;
  let excitement :string = '';
  log();
  
  // $: speedBanner = `${mph} `.repeat(mph);

  function timeTravel() :void {
    addChild();
    if (mph * 1.1 < 88) mph = Math.floor(mph * 1.1);
    else {
      mph = 88
      excitement += '!';
    }
  }
  let parent;
  let things = ['toy', 'calculator', 'ice crean']
  function addChild() {
    // const child = document.createElement('button');
		// parent.appendChild(child);
    things = [...things, 'another thing'];
  }
  // TEST FUNCTION TO LOG EVENTS
  function log() {
  // window.document.addEventListener('SvelteRegisterBlock', e => svelteVersion = e.detail.version, { once: true })
  window.document.addEventListener('SvelteRegisterComponent', (e) => console.log('SvelteRegisterComponent', e))
  window.document.addEventListener('SvelteRegisterBlock', (e) => console.log('SvelteRegisterBlock', e))
  window.document.addEventListener('SvelteDOMInsert', (e) => console.log('SvelteDOMInsert', e))
  window.document.addEventListener('SvelteDOMRemove',(e) => console.log('SvelteDOMRemove', e))
  window.document.addEventListener('SvelteDOMAddEventListener', (e) => console.log('SvelteDOMAddEventListener', e))
  window.document.addEventListener('SvelteDOMRemoveEventListener', (e) => console.log('SvelteDOMRemoveEventListener', e))
  window.document.addEventListener('SvelteDOMSetData', (e) => console.log('SvelteDOMSetData', e))
  window.document.addEventListener('SvelteDOMSetProperty', (e) => console.log('SvelteDOMSetProperty', e))
  window.document.addEventListener('SvelteDOMSetAttribute', (e) => console.log('SvelteDOMSetAttribute', e))
  window.document.addEventListener('SvelteDOMRemoveAttribute', (e) => console.log('SvelteDOMRemoveAttribute', e))
  }
</script>
<div class="container">
  <h1> {mph < 88 ? "Cruising at" : "Approaching"} {mph} miles per hour{excitement}</h1>
  <button on:click={timeTravel}>Time travel!</button>
  <!-- <p class="banner">{speedBanner}</p> -->
  <div bind:this={parent}></div>
</div>
<ul>
  {#each things as thing}
    <li>{thing}</li>
  {/each}
</ul>

<style>
  h1 {
    color: orangered;
    text-align: center;
  }
  button {
    padding: 2em 4em;
    font-family: inherit;
    text-transform: uppercase;
    border-radius: 4px;
    border: none;
    background-color: wheat;
    color: brown;
    font-style: italic;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    background-color: blanchedalmond;
    box-shadow: rgb(156, 145, 127) 5px 5px 5px;
  }
  .banner {
    color: navy;
    margin: 5em;
    max-width: fit-content;
    text-align: center;
  }
</style>