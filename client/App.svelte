<script lang="ts">
  let class1 = "container";
  let mph: number = 30;
  let excitement: string = "";
  let notUntil5Counter = 0;
  let test = "test";

  function timeTravel(): void {
    addChild();
    if (mph * 1.1 < 88) mph = Math.floor(mph * 1.1);
    else {
      mph = 88;
      excitement += "!";
    }
  }

  // let parent: string = "parent";
  // let things = ["toy", "ice cream", "skate board"];
  // function addChild() {
  //   things = [...things, "another thing"];
  // }
  // GOAL: MAKE THIS WORK SO THAT NO SYNONYM IS REPEATED AND 'OUT OF IDEAS' PRINTS AFTER THEY'VE ALL BEEN USED
  const synonyms = ['pain','agony','suffering','difficulty', 'regret', 'torture', 'torment', 'never-ending', 'sorrow', 'aching', 'confusion', 'why', 'too late'];
  let things = ["toy", "ice cream", "skate board"];
  let newThing;
  // let seen = [];
  const seen = [];
  function addChild() {
    if (seen.length < synonyms.length - 1) {
      newThing = synonyms[Math.floor(Math.random() * (synonyms.length - 1))];
      while (seen.includes(newThing)) {
        newThing = synonyms[Math.floor(Math.random() * (synonyms.length - 1))]
      }
      // seen = [...seen, newThing];
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
  <button on:click={timeTravel}>Time travel! {test}</button>
  <p>What's on your mind?</p>
  <!-- <span>{notUntil5Counter < 5 ? "" : notUntil5Counter}</span>
  <button on:click={() => (notUntil5Counter += 1)}>Add 1 to Counter</button> -->
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
  /* .banner {
    color: navy;
    margin: 5em;
    max-width: fit-content;
    text-align: center;
  } */
  li {
    list-style: none;
  }
  li:before {
    content: "🚀";
    margin: 0 16px 0 0;
  }
  /* .test {
    font-size: large;
    color: aqua;
  } */
</style>
