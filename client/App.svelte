<script>
  let mph = 30;
  let excitement = '';
  
  $: speedBanner = mph.repeat(mph);

  function timeTravel() {
    if (!mph) mph = 88;
    excitement += '!';
  }
</script>

<h1> Approaching {mph} miles per hour{excitement}</h1>
<button on:click={timeTravel}>Time travel!</button>
<p>{speedBanner}</p>

<style>
  h1 {
    color: orangered;
  }
</style>