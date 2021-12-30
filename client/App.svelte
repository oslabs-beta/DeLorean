<script lang="ts">
  let mph: number = 30;
  let excitement :string = '';
  
  $: speedBanner = `${mph} `.repeat(mph);

  function timeTravel() :void {
    if (mph * 1.1 < 88) mph = Math.floor(mph * 1.1);
    else {
      mph = 88
      excitement += '!';
    }
  }
</script>
<div class="container">
  <h1> {mph < 88 ? "Cruising at" : "Approaching"} {mph} miles per hour{excitement}</h1>
  <button on:click={timeTravel}>Time travel!</button>
  <p class="banner">{speedBanner}</p>
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