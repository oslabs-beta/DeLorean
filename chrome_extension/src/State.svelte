<script>
  export let compState;
</script>

<div>
  <ul>
    {#each compState || [] as state, i}
      {#if state}
        {#if Array.isArray(state)}
          <li>Array: 
          <svelte:self compState={state} />
          </li>
        {:else}
          <li>{state}</li>
        {/if}
      {/if}
    {/each}
  </ul>
</div>

<style>
  li {
    color: rgb(0, 107, 194);
    font-family: monospace;
  }
</style>
