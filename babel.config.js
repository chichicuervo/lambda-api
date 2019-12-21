const presets = [
    ['minify', {
        keepFnName: true,
        keepClassName: true,
    }],
    ["@babel/preset-react", {
        useBuiltIns: true,
    }],
    ["@babel/preset-env", {
        useBuiltIns: "usage",
        corejs: {
            version: 3,
            proposals: true
        },
        targets: {
            esmodules: true,
        },
        modules: 'auto',
        shippedProposals: true,
    }],
]

const plugins = [
    '@babel/plugin-proposal-class-properties',
]

module.exports = {
	presets,
	plugins
}
