const path = require("path")
const webpack = require("webpack")
const SCW = require("slightning-coco-widget--webpack")

// @ts-ignore
const { project } = require("./project.ts")

module.exports = {
    mode: "none",
    stats: "minimal",
    entry: {
        [project.name + "（编程猫CoCo 控件版）"]: "./src/wrapper/kitten-cloud-function-codemao-coco-widget.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        presets: ["@babel/preset-typescript"]
                    }
                },
            }, ...SCW.loaders
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    externalsType: SCW.externalsType,
    externals: SCW.externals,
    plugins: [
        ...SCW.plugins, new webpack.BannerPlugin({
            banner:[
                "==CoCoWidget==",
                "@name " + project.name,
                "@author " + project.author,
                "@version " + project.version,
                "@license " + project.license,
                "@website https://s-lightning.github.io/",
                "==/CoCoWidget=="
            ].map(line => `// ${line}\n`).join(""),
            raw: true,
            test: /（编程猫CoCo 控件版）\.js/,
            entryOnly: true
        })
    ]
}
