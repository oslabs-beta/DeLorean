<script>
  export let counter = 0;
  function handleClick() {
    counter = counter + 1;
  }
</script>

<div>
  <button on:click={handleClick}>{counter}</button>
</div>

<style>
  button {
    padding: 2em 4em;
    font-family: inherit;
    text-transform: uppercase;
    border-radius: 4px;
    border: none;
    background-color: wheat;
    color: brown;
    font-style: italic;
    margin: 5px;
  }
  button:hover{
    background-color: brown;
    color: wheat;
    transition: .5s;
  }
</style>