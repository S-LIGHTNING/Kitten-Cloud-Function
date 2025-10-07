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
    const comments = [
        "@name " + project.name,
        "@author " + project.author,
        "@version " + project.version,
        "@license " + project.license
    ]
    return merge(common({ ...env, comments }, argv), {
        entry: {
            [project.title + "-browser" + ".js"]: "./src/wrapper/kitten-cloud-function-package.ts",
            [project.title + "-browser" + ".min.js"]: "./src/wrapper/kitten-cloud-function-package.ts"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            library: {
                name: {
                    root: "KittenCloudFunction"
                },
                type: "umd"
            }
        },
        externalsType: "var",
        externals: {
            "axios": "axios",
            "diff": "diff",
            "@slightning/anything-to-string": "stringify"
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^(fs|os|path|websocket|appdirsjs)$/
            }),
            new webpack.BannerPlugin({
                banner: "/**" + "\n" + comments.map(line => ` * ${line}\n`).join("") + " */" + "\n",
                raw: true,
                entryOnly: true
            })
        ]
    })
}
