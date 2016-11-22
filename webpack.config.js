const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./lib/parts');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	test: path.join(__dirname, 'tests')
};

process.env.BABEL_ENV = TARGET;

const common = merge(
	{
		entry: {
			app: PATHS.app
		},

		output: {
			paths: PATHS.build,
			filename: '[name].js'
		},

		resolve: {
			extensions: ['', '.js', '.jsx']
		}
	},

	parts.loadJSX(PATHS.app),
	parts.lintJSX(PATHS.app)
);

var config;

switch(TARGET) {
	case "test":
	case "test:tdd":
		config = merge(
			common, {
				devtool: 'inline-source-map'
			},

			parts.loadIsparta(PATHS.app),
			parts.loadJSX(PATHS.test)
		);
		break;
	default:
		config = merge(
			common, {
				devtool: 'eval-soure-map',
			},

			parts.devServer({
				host: process.env.HOST,	
				port: process.env.PORT,
				poll: ENABLE_POLLING
			}),

			parts.enableReactPerformanceTools(),
			parts.npmInstall()
		);
}

module.exports = validate(config, {
	quiet: true
});