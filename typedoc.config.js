module.exports = {
    name: "源码云功能文档",
    entryPoints: [
        "src/**/*"
    ],
    out: "docs",
    theme: "default",
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    excludeNotDocumented: true,
    exclude: ["node_modules"],
    readme: "README.md"
}
