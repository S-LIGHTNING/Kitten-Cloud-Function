const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const SCW = require("slightning-coco-widget--webpack")

const { project } = require("./project")

/**
 * @typedef {Object} AllowInfo
 * @property {string} user
 * @property {string} usingWork
 * @property {string} connectingWork
 */

/**
 * @param {{ mode?: webpack.Configuration["mode"], platform?: string } & AllowInfo} env
 * @param {string[]} argv
 * @returns {webpack.Configuration}
 */
module.exports = function (env, argv) {
    const { mode = "production", platform = "编程猫 CoCo" } = env
    let editionName = `（${platform} 控件版）`, isExclusiveEdition = false
    if (mode == "development") {
        editionName += "（开发调试版）"
    } else if (
        typeof env.user == "string" &&
        typeof env.usingWork == "string" &&
        typeof env.connectingWork == "string"
    ) {
        isExclusiveEdition = true
        editionName += `（用户 ${env.user} 在 ${env.usingWork} 中连接 ${env.connectingWork} 的专用版）`
    } else {
        editionName += "（修改受限版）"
    }
    const comments = [
        "@name " + project.name + editionName,
        "@author " + project.author,
        "@version " + project.version,
        "@license " + project.license
    ]
    return merge({
        entry: {
            [project.name + editionName + ".js"]: "./src/wrapper/kitten-cloud-function-codemao-coco-widget/index.ts",
            [project.name + editionName + ".min.js"]: "./src/wrapper/kitten-cloud-function-codemao-coco-widget/index.ts"
        },
        output: {
            path: mode == "development" ? path.resolve(__dirname, "out", "dev") : path.resolve(__dirname, "out")
        },
        module: {
            rules: [
                {
                    test: /kitten-cloud-function-codemao-coco-widget[\\\/]widget\.ts$/,
                    exclude: /node_modules/,
                    use: mode == "development" ? [
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: "KITTEN_CLOUD_FUNCTION_DEVELOP",
                                replace: "true"
                            }
                        }
                    ] : [
                        {
                            loader: "obfuscator-loader",
                            options: /** @type {import("javascript-obfuscator").ObfuscatorOptions} */({
                                controlFlowFlattening: true,
                                controlFlowFlatteningThreshold: 1,
                                identifierNamesGenerator: "mangled-shuffled",
                                renameGlobals: true,
                                stringArrayEncoding: ["rc4"],
                                stringArrayThreshold: 1,
                                target: "browser-no-eval"
                            })
                        }, {
                            loader: "string-replace-loader",
                            options: { multiple: [
                                {
                                    search: "KITTEN_CLOUD_FUNCTION_DEVELOP",
                                    replace: "false"
                                }, {
                                    search: "KITTEN_CLOUD_FUNCTION_ALLOW_USER",
                                    replace: isExclusiveEdition ? JSON.stringify(env.user) : "null"
                                }, {
                                    search: "KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK",
                                    replace: isExclusiveEdition ? JSON.stringify(env.usingWork) : "null"
                                }, {
                                    search: "KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK",
                                    replace: isExclusiveEdition ? JSON.stringify(env.connectingWork) : "null"
                                }
                            ]}
                        }, {
                            loader: "babel-loader",
                            options: /** @type {import("@babel/core").TransformOptions} */({
                                plugins: [path.resolve(__dirname, "obfuscator.js")],
                                babelrc: false
                            })
                        }, {
                            loader: "babel-loader",
                            options: /** @type {import("@babel/core").TransformOptions} */({
                                presets: [
                                    ["@babel/preset-env", {
                                        targets: {
                                            ie: "11"
                                        }
                                    }]
                                ],
                                babelrc: false
                            })
                        }
                    ]
                }, {
                    test: /\.(t|j)sx?$/,
                    use: {
                        loader: SCW.Loaders.ExternalImport,
                        options: {
                            "@slightning/anything-to-string": "https://unpkg.com/@slightning/anything-to-string@1/dist/cjs/bundle.min.js",
                            "axios": "https://unpkg.com/axios@1/dist/axios.min.js",
                            "diff": "https://unpkg.com/diff@5/dist/diff.min.js"
                        }
                    }
                }
            ]
        },
        externalsType: "commonjs",
        externals: {
            "crypto-js": "crypto-js"
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^(fs|os|path|websocket|appdirsjs)$/
            }),
            new webpack.BannerPlugin({
                banner: `require("crypto-js");`,
                raw: true,
                entryOnly: true
            })
        ]
    }, SCW.config, {
        plugins: [
            new webpack.BannerPlugin({
                banner: "/**" + "\n" + comments.map(line => ` * ${line}\n`).join("") + " */" + "\n",
                raw: true,
                entryOnly: true
            })
        ]
    }, common({ ...env, comments }, argv))
}
