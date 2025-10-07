const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

const { project } = require("./project")

/**
 * @param {{ mode: webpack.Configuration["mode"] }} env
 * @param {string[]} argv
 * @returns {webpack.Configuration}
 */
module.exports = function (env, argv) {
    return merge(common({ ...env, comments: [] }, argv), {
        mode: "production",
        output: {
            path: path.resolve(__dirname, "dist"),
        },
        entry: {
            [project.title + "-command-line-interface" + ".mjs"]: "./src/wrapper/kitten-cloud-function-command-line-interface.ts"
        },
        experiments: {
            outputModule: true
        },
        externalsType: "node-commonjs",
        externals: {
            "fs": "fs",
            "os": "os",
            "path": "path",
            "chalk": "module chalk",
            "axios": "module axios",
            "commander": "commander",
            "@johnls/readline-password": "@johnls/readline-password",
            "@slightning/anything-to-string": "@slightning/anything-to-string",
            "websocket": "websocket",
            "appdirsjs": "appdirsjs",
            "diff": "module diff",
            "crypto-js": "crypto-js"
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: "#!/usr/bin/env node\n",
                raw: true,
                entryOnly: true
            })
        ]
    })
}
