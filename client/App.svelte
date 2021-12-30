<script lang="ts">
  let mph: string = "30";
  let excitement :string = '';
  
  $: speedBanner = mph.repeat(Number(mph));

  function timeTravel() :void {
    const mphNum: number = Number(mph)
    if (mphNum * 1.1 < 88) mph = Math.floor(mphNum * 1.1).toString();
    else {
      (mph = "88");
      excitement += '!';
    }
  }
</script>
<div class="container">
  <h1> Approaching {mph} miles per hour{excitement}</h1>
  <button on:click={timeTravel}>Time travel!</button>
  <p class="banner">{speedBanner}</p>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    background-color: blanchedalmond;
    box-shadow: rgb(156, 145, 127) 5px 5px 5px;
  }
  h1 {
    color: orangered;
  }
  .banner {
    color: navy;
    margin: 5em;
  }
</style>