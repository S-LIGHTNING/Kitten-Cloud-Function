const path = require("path")
const webpack = require("webpack")

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
                test: /\.(j|t)sx?/,
                exclude: /node_modules/,
                use: {
                    loader: "string-replace-loader",
                    options: {
                        search: /WebSocket/g,
                        replace: "Web_Socket"
                    }
                }
            }, {
                test: /\.(j|t)sx?/,
                use: {
                    loader: "string-replace-loader",
                    options: {
                        search: /XMLHttpRequest/g,
                        replace: "XML_Http_Request"
                    }
                }
            }, {
                test: /\.(j|t)sx?/,
                use: {
                    loader: "string-replace-loader",
                    options: {
                        search: /(?<!\/)fetch/g,
                        replace: "fe_tch"
                    }
                }
            }, {
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
    externals: {},
    plugins: [
        new webpack.BannerPlugin({
            banner:[
                "==CoCoWidget==",
                "@name " + project.name,
                "@author " + project.author,
                "@version " + project.version,
                "@license " + project.license,
                "@website https://s-lightning.github.io/",
                "==/CoCoWidget=="
            ].map(line => `// ${line}\n`).join("") + "\n" +
            [
                function getGlobal(name) {
                    return new Function("return " + name.replace(/_/g, ""))()
                },
                `var window = getGlobal("window");`,
                `var document = getGlobal("document");`,
                `var Web_Socket = getGlobal("Web_Socket");`,
                `var XML_Http_Request = getGlobal("XML_Http_Request");`,
                `var fe_tch = getGlobal("fe_tch");`
            ].join("\n"),
            raw: true,
            test: /（编程猫CoCo 控件版）\.js/,
            entryOnly: true
        })
    ]
}
