<script>
  // import test from '../main.js';
  import State from './State.svelte';
  let currentState = [];
  // value coming into App.svelte that updates state will be in an array,
  // we need to update our state by adding new elements into the existing array
  let snapshot = [];
</script>

<div class="main-page">
  <!-- <p>{name}</p> -->
  <!-- {#each snapshot as instance} -->
  <State />
  <!-- {/each} -->
</div>




<style>
  h1 {
    color: blue;
  }
</style>
