<script lang="ts">
import Test from "./Test.svelte"
  let class1 = 'container';
  let mph: number = 30;
  let excitement :string = '';
  let notUntil5Counter = 0;
  log();
  let test = 'test';
  let changeGreet = 'hi aram'
  // $: speedBanner = `${mph} `.repeat(mph);

  function timeTravel() :void {
    addChild();
    if (mph * 1.1 < 88) mph = Math.floor(mph * 1.1);
    else {
      mph = 88
      excitement += '!';
    }
  }
  
  let parent: string = 'parent';
  let things = ['toy']
  function addChild() {
    // const child = document.createElement('button');
		// parent.appendChild(child);
    things = [...things, 'another thing'];
    const target = document.getElementById('target');
    // target.setAttribute('class', 'test')
    class1 = 'testclass';
  }
  
  
  // TEST FUNCTION TO LOG EVENTS  
  function log() {
    // window.document.addEventListener('SvelteRegisterBlock', e => svelteVersion = e.detail.version, { once: true })
    window.document.addEventListener('SvelteRegisterComponent', (e) => console.log('SvelteRegisterComponent', e.detail))
    // window.document.addEventListener('SvelteRegisterBlock', (e) => console.log('SvelteRegisterBlock', e.detail.ctx[e.detail.ctx.length -1]))
    window.document.addEventListener('SvelteRegisterBlock', (e) => console.log('SvelteRegisterBlock', e.detail.ctx))
    window.document.addEventListener('SvelteDOMInsert', (e) => console.log('SvelteDOMInsert', e.detail.node))
    window.document.addEventListener('SvelteDOMRemove',(e) => console.log('SvelteDOMRemove', e.detail))
    window.document.addEventListener('SvelteDOMAddEventListener', (e) => console.log('SvelteDOMAddEventListener', e.detail))
    window.document.addEventListener('SvelteDOMRemoveEventListener', (e) => console.log('SvelteDOMRemoveEventListener', e.detail))
    window.document.addEventListener('SvelteDOMSetData', (e) => console.log('SvelteDOMSetData', e.detail))
    window.document.addEventListener('SvelteDOMSetProperty', (e) => console.log('SvelteDOMSetProperty', e.detail))
    window.document.addEventListener('SvelteDOMSetAttribute', (e) => console.log('SvelteDOMSetAttribute', e.detail))
    window.document.addEventListener('SvelteDOMRemoveAttribute', (e) => console.log('SvelteDOMRemoveAttribute', e.detail))
  }
</script>

<div class={class1} id="target">
  <h1> {mph < 88 ? "Cruising at" : "Approaching"} {mph} miles per hour{excitement}</h1>
  <button on:click={timeTravel}>Time travel! {test}</button>
  <!-- <p class="banner">{speedBanner}</p> -->
  <div class={parent}></div>
  <Test />
  <p>Won't display until 5 clicks: </p><span>{notUntil5Counter < 5 ? '' : notUntil5Counter}</span>
  <button on:click={() => notUntil5Counter += 1}>Add 1 to Counter</button>
  <!-- <button on:click={addChild}>add child</button> -->
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
  /* .banner {
    color: navy;
    margin: 5em;
    max-width: fit-content;
    text-align: center;
  } */

  .test{
    font-size: large;
    color: aqua;
  }
</style>