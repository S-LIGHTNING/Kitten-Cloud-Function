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
            library: {
                type: "module"
            }
        },
        entry: {
            [project.title + "-package-bundle" + ".js"]: "./src/wrapper/kitten-cloud-function-package.ts"
        },
        experiments: {
            outputModule: true
        },
        externalsType: "node-commonjs",
        externals: {
            "fs": "fs",
            "os": "os",
            "path": "path",
            "axios": "module axios",
            "websocket": "websocket",
            "appdirsjs": "appdirsjs",
            "diff": "module diff",
            "crypto-js": "crypto-js"
        },
        plugins: []
    })
}
