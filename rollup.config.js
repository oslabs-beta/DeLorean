import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default [
  {
    input: "./chrome_extension/src/index.js",
    external: "chrome",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "./chrome_extension/build/bundleDelorean.js",
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ sourceMap: true }),
        compilerOptions: {
          // enable run-time checks when not in production
          dev: !production,
        },
      }),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css({ output: "bundle.css" }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript({
        sourceMap: true,
        inlineSources: !production,
      }),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload("public"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "./chrome_extension/contentScript.js",
    external: "chrome",
    output: {
      file: "./chrome_extension/output/bundledContentScript.js",
      name: "contentScript",
      format: "iife",
      banner: `if (!window.tag) {
		window.tag = document.createElement('script')
		window.tag.text = \``,
      footer: `\`
		if (window.sessionStorage.SvelteDevToolsProfilerEnabled === "true") window.tag.text = window.tag.text.replace('let profilerEnabled = false;', '\$&\\nstartProfiler();')
		document.children[0].append(window.tag)
		const sendMessage = chrome.runtime.sendMessage
		const postMessage = window.postMessage.bind(window)
		chrome.runtime.onMessage.addListener((message, sender) => {
			const fromBackground = sender && sender.id === chrome.runtime.id
			if (!fromBackground) {
				console.error('Message from unexpected sender', sender, message)
				return
			}
			switch (message.type) {
				case 'startProfiler':
					window.sessionStorage.SvelteDevToolsProfilerEnabled = "true"
					break
				case 'stopProfiler':
					// fallthrough
				case 'clear':
					delete window.sessionStorage.SvelteDevToolsProfilerEnabled
					break
			}
			postMessage(message)
		})
		window.addEventListener(
			'message',
			e => e.source == window && sendMessage(e.data),
			false
		)
		window.addEventListener('unload', () => sendMessage({ type: 'clear' }))
	}`,
    },
    plugins: [
      resolve(),
      svelte({
        preprocess: sveltePreprocess({ sourceMap: true }),
        compilerOptions: {
          // enable run-time checks when not in production
          dev: !production,
        },
      }),
    ],
  },
  {
    input: "./client/main.ts",
    external: "chrome",
    output: {
      sourcemap: true,
      format: "iife",
      name: "demoApp",
      file: "./public/build/bundle.js",
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ sourceMap: true }),
        compilerOptions: {
          // enable run-time checks when not in production
          dev: !production,
        },
      }),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css({ output: "bundle.css" }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript({
        sourceMap: true,
        inlineSources: !production,
      }),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload("public"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
