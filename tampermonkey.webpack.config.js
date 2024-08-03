const path = require("path")
const webpack = require("webpack")

// @ts-ignore
const { project } = require("./project.ts")

module.exports = {
    mode: "none",
    stats: "minimal",
    entry: {
        ["窜改猴脚本版/" + project.name + "（窜改猴库版）"]: "./src/wrapper/tampermonkey/kitten-cloud-function-tampermonkey-library.ts",
        ["窜改猴脚本版/" + project.name + "（窜改猴用户脚本版）"]: "./src/wrapper/tampermonkey/kitten-cloud-function-tampermonkey-user-script.ts"
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
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: "babel-loader",
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    externalsType: "commonjs",
    externals: {
        "diff": "diff"
    },
    plugins: [
        new webpack.BannerPlugin({
            banner:[
                "==UserScript==",
                "@name 编程猫" + project.name,
                "@namespace https://s-lightning.github.io/",
                "@author " + project.author,
                "@version " + project.version,
                "@description 用于编程猫源码云功能（云变量、云列表等）的客户端库，包含查看和修改编程猫已发布的源码作品的云变量和云列表的功能",
                "@icon https://cdn-community.codemao.cn/community_frontend/asset/icon_kitten4_bd2e0.png",
                "@license " + project.license,
                "@require https://cdn.jsdelivr.net/npm/diff@5.2.0/dist/diff.js",
                "==/UserScript=="
            ].map(line => `// ${line}\n`).join(""),
            raw: true,
            test: /（窜改猴库版）\.js/,
            entryOnly: true
        }),
        new webpack.BannerPlugin({
            banner:[
                "==UserScript==",
                "@name 编程猫源码云数据编辑器",
                "@namespace https://s-lightning.github.io/",
                "@author " + project.author,
                "@version 1.0.0",
                "@description 基于源码云功能客户端编写的用户脚本，可以查看和修改编程猫已发布的源码作品的云变量和云列表",
                "@icon https://cdn-community.codemao.cn/community_frontend/asset/icon_kitten4_bd2e0.png",
                "@license " + project.license,
                "==/UserScript=="
            ].map(line => `// ${line}\n`).join(""),
            raw: true,
            test: /（窜改猴用户脚本版）\.js/,
            entryOnly: true
        })
    ]
}
