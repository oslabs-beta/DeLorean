<script lang="ts">
  // import Child from "./Child.svelte"
  let mph: number = 30;
  let excitement: string = "";

  function timeTravel(): void {
    addChild();
    if (mph * 1.1 < 88) mph = Math.floor(mph * 1.1);
    else {
      mph = 88;
      excitement += "!";
    }
  }

  // GOAL: MAKE THIS WORK SO THAT NO SYNONYM IS REPEATED AND 'OUT OF IDEAS' PRINTS AFTER THEY'VE ALL BEEN USED
  const synonyms = ['fun','cool','time-warp','pickup game', 'hang ten', 'friendship', 'happy', 'basket of kittens', 'quiet contemplation', 'cold brew', 'cold beer', 'fried egg', 'california condor'];
  let things = ["toy", "ice cream", "skate board"];
  let newThing: string;
  // let seen = [];
  const seen: string[] = [];
  function addChild() {
    if (seen.length < synonyms.length - 1) {
      newThing = synonyms[Math.floor(Math.random() * (synonyms.length - 1))];
      while (seen.includes(newThing)) {
        newThing = synonyms[Math.floor(Math.random() * (synonyms.length - 1))]
      }
      seen.push(newThing);
    } else {
      newThing = 'out of ideas :(';
    }
    things = [...things, newThing];
  }
</script>

<div class="container" id="target">
  <h1>
    {mph < 88 ? "Cruising at" : "Approaching"}
    {mph} miles per hour{excitement}
  </h1>
  <button on:click={timeTravel}>Time travel!</button>
  <!-- <Child /> -->
  <p>What's on your mind?</p>
  <ul>
    {#each things as thing}
      <li>{thing}</li>
    {/each}
  </ul>
</div>

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
  button:hover{
    background-color: brown;
    color: wheat;
    transition: .5s;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    background-color: blanchedalmond;
    box-shadow: rgb(156, 145, 127) 5px 5px 5px;
  }
  li {
    list-style: none;
  }
  li:before {
    content: "🚀";
    margin: 0 16px 0 0;
  }
</style>
