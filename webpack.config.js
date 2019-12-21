const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    target: "node",
    mode: "production",
	entry: './lib/index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'index.js',
		library: '@jbelich/lambdaApi',
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
};
