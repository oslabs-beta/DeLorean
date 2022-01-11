# DeLorean

![](assets/logo.png)
Svelte Time Traveling Debugger


### Heads Up

In order to run this application, Svelte must be compiled in dev mode. Further, your application must be appended to a div with the id 'root' in your html body.

For example: 

index.html:
<body>
  <div id="root" />
</body>

main.js/ts:

import App from './App.svelte';

new App({
  target: document.getElementById('root'),
});