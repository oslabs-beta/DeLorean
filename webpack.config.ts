import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve as _resolve } from 'path';
import path from 'path';
import preprocess from 'svelte-preprocess';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

/**
 * Change this to `true` to generate source maps alongside your production bundle. This is useful for debugging, but
 * will increase total bundle size and expose your source code.
 */
 const sourceMapsInProduction = false;

const config: Configuration = {
	mode: isProduction ? 'production' : 'development',
	entry: {
		bundle: [
			'./sclient/index.ts'
		]
	},
	resolve: {
		alias: {
			// Note: Later in this config file, we'll automatically add paths from `tsconfig.compilerOptions.paths`
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: '[name].js',
		},
	module: {
		rules: [
			// Rule: Svelte
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							// Dev mode must be enabled for HMR to work!
							dev: isDevelopment
						},
						emitCss: isProduction,
						hotReload: isDevelopment,
						hotOptions: {
							// List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
							noPreserveState: false,
							optimistic: true,
						},
						preprocess: preprocess({
							scss: true,
							sass: true,
							}
						)
					}
				}
			},
			// Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
			// See: https://github.com/sveltejs/svelte-loader#usage
			{
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
			// Rule: TypeScript
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
		proxy: {

		}
  },
	plugins: [
		  new HtmlWebpackPlugin({ template: './index.html' }),
	],
	devtool: 'source-map',
}

export default config;