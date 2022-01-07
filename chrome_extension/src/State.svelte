<script>
  export let compState;
</script>

<div>
  <slot></slot>
  <ul>
  {#each compState as state}
  <li>{state}</li>   
  {/each}
  </ul>
</div>

<style>
  li {
    color: blue;
  }
</style>