![](assets/logo.png)

# DeLorean
The first time-travelling debugger for Svelte applciations

DeLorean is a debugging tool for Svelte developers. It records snapshots when a target applications's state changes, and allows users to jump to any previously recorded state. It displays the values of all variables in state at the time of the snapshot alongside the jump button.

### Features

##### Dev Tool information panel
DeLorean features a clean, minimal UI that's easily accessible from within the Chrome developer tools panel. 

##### Time-travel
It will time travel your app state.

### Installation

To install DeLorean, simply add the extension to your browser from the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions). After instlallation is complete it will be available within the developer tools panel in Chrome.

### How To Use

##### Run in dev mode
Importantly, this debugging tool can only operate on Svelte applications being run in dev mode. Without dev mode enabled, Svelte's internal compiler strips some internal functionality to reduce overall bundle size. DeLorean requires that functionality, so ensure dev mode is enabled.

##### Attach your Svelte app to an element with the id "root"
At this time, DeLorean searches the tested application for an id of "root" to find Svelte components to test. An example format for an html page and its main svelte component:
index.html:
```
<head></head>
<body>
  <div id="root" />
</body>
```
main.js:
```
import App from './App.svelte';

new App({
  target: document.getElementById('root'),
});
```

##### Run the application from localhost*
This extension has 

##### Click connect first, then the second button
This needs to be done in order.

##### Make some state changes, then click the state buttons
Have fun!

### Troubleshooting

[] Is your application running in dev mode?

[] Is your Svelte component attached to an element with the id of "root"?

[] Are you running your app from something other than a localhost url?

[] Are there multiple components in your application? Dang.

### Learn More

... some articles

### Contributors

**Albert Han** - [@alberthan1](https://github.com/alberthan1)
**Aram Krakirian** - [@aramkrakirian](https://github.com/aramkrakirian)
**Erick Maese** - [@ErickMaese](https://github.com/ErickMaese)
**Trevor Leung** - [@trevleung](https://github.com/trevleung)
**Sam VanTassel** - [@SamVanTassel](https://github.com/SamVanTassel)