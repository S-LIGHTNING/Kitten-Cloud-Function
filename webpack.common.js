const webpack = require("webpack")
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")

/**
 * @param {{ mode?: webpack.Configuration["mode"], comments: string[] }} env
 * @param {string[]} __argv
 * @returns {webpack.Configuration}
 */
module.exports = function (env, __argv) {
    const { mode = "production", comments } = env
    return {
        mode,
        stats: "minimal",
        output: {
            filename: "[name]",
            environment: {
                arrowFunction: false
            }
        },
        devServer: {
            static: false,
            allowedHosts: [
                "coco.codemao.cn",
                "cp.cocotais.cn"
            ],
            headers(incomingMessage) {
                /** @type {{ rawHeaders: string[] }} */
                const {rawHeaders} = incomingMessage
                const origin = rawHeaders[rawHeaders.findIndex((value) => {
                    return /origin/i.test(value)
                }) + 1]
                return {
                    "Access-Control-Allow-Origin": origin,
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "GET"
                }
            },
            hot: false,
            liveReload: false
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    include: /\.min\./,
                    terserOptions: {
                        format: {
                            // @ts-ignore
                            comments: new Function(
                                "__node", "comment",
                                `return ${JSON.stringify(comments)}.filter(item => comment.value.includes(item)).length != 0`
                            )
                        }
                    },
                    extractComments: false
                })
            ]
        },
        module: {
            rules: [
                ...(mode == "production" ? [{
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                }] : []), {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                }
            ]
        },
        devtool: mode == "development" ? "eval-source-map" : false,
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        plugins: [
            new webpack.ProgressPlugin()
        ]
    }
}
