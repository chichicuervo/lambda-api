const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    target: "node",
    mode: "production",
	entry: {
        index: './api/index.js',
        hooks: './hooks/index.js',
    },
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: '[name].js',
		library: [ '@jbelich', 'lambda-api', "[name]" ],
		libraryTarget: 'umd',
	},
    optimization: {
        minimize: true,
        sideEffects: true,
        usedExports: true,
        minimizer: [
            new TerserPlugin()
        ]
    },
    externals: [ nodeExternals() ],
    module: {
		rules: [ {
			test: /\.(mjs|jsx?)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				}
			}
        } ]
	}
};
