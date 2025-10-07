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
    const { mode = "production" } = env
    const comments = [
        "==UserScript==",
        "@name 编程猫源码云数据编辑器",
        "@namespace https://s-lightning.github.io/",
        "@author " + project.author,
        "@version 1.0.0",
        "@description 基于源码云功能客户端编写的用户脚本，可以查看和修改编程猫已发布的源码作品的云变量和云列表",
        "@icon https://cdn-community.codemao.cn/community_frontend/asset/icon_kitten4_bd2e0.png",
        "@license " + project.license,
        "==/UserScript=="
    ]
    return merge(common({ ...env, comments }, argv), {
        entry: {
            [project.name + "（用户脚本版）" + ".js"]: "./src/wrapper/kitten-cloud-function-user-script.ts"
        },
        output: {
            path: mode == "development" ? path.resolve(__dirname, "out", "dev") : path.resolve(__dirname, "out")
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^(fs|os|path|websocket|appdirsjs)$/
            }),
            new webpack.BannerPlugin({
                banner: comments.map(line => `// ${line}\n`).join(""),
                raw: true,
                entryOnly: true
            })
        ]
    })
}
