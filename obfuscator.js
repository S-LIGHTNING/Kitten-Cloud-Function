const Babel = require("@babel/core")

const Globals = Object.keys(global).concat(["location"])

const { types: t, template } = Babel

const getFunctionName = "__get__"

const getGlobalFunctionTemplate = template.expression(`
    ${getFunctionName}.constructor("return " + NAME)
`)

const getFunctionTemplate = template.statements(`
    function ${getFunctionName}(index) {
        return VALUES[Math.ceil((index - ${getFunctionName}.constructor("return Date")().now()) / 1000)]()
    }
    ${getFunctionName}.offset = function (index) {
        return 12
    }
    ${getFunctionName}.index = function (index) {
        return parseInt(index.trim()) - ${getFunctionName}.offset(114514)
    }
`)

const CallGetFunctionTemplate = template.expression(`
    ${getFunctionName}.call("get", INDEX * 1000 + ${getFunctionName}.constructor("return Date")().now())
`)

/** @type {Map<string, number>} */
let globalVars
/** @type {number} */
let count

/** @type {Babel.Visitor} */
const visitor = {
    Program: {
        enter() {
            globalVars = new Map()
            count = 0
        },
        exit(programPath) {
            const names = []
            for (const [name, count] of globalVars) {
                names[count] = name
            }
            for (const [name, binding] of Object.entries(programPath.scope.getAllBindings())) {
                if (!binding.referenced) {
                    continue
                }
                names.push(name)
                for (const referencePath of binding.referencePaths) {
                    if (referencePath.parentPath?.isExportSpecifier()) {
                        continue
                    }
                    referencePath.replaceWith(CallGetFunctionTemplate({
                        INDEX: t.numericLiteral(count)
                    }))
                }
                count++
            }
            programPath.node.body.unshift(...getFunctionTemplate({
                VALUES: t.arrayExpression(names.map(name =>
                    programPath.scope.getBinding(name) == null && Globals.includes(name) ?
                    getGlobalFunctionTemplate({ NAME: t.stringLiteral(name) }) :
                    t.functionExpression(null, [], t.blockStatement([t.returnStatement(t.identifier(name))]))
                ))
            }))
        }
    },
    Identifier(path) {
        if (!path.isReferencedIdentifier()) { return }
        if (path.parentPath?.isExportSpecifier()) { return }
        if (path.parentPath.isUnaryExpression({ operator: "typeof" })) { return }
        const { name } = path.node
        const binding = path.scope.getBinding(name)
        if (binding != undefined) { return }
        if (name == getFunctionName || name == "arguments") { return }
        const thisCount = globalVars.get(name) ?? (globalVars.set(name, count++), count - 1)
        path.replaceWith(CallGetFunctionTemplate({ INDEX: t.numericLiteral(thisCount) }))
    },
    ThrowStatement(path) {
        const argumentPath = path.get("argument")
        /** @type {Map<string, string>} */
        const nameMap = new Map()
        /** @type {string[]} */
        const names = []
        let count = 0
        argumentPath.traverse({
            Identifier(path) {
                if (!path.isReferencedIdentifier()) { return }
                const { name } = path.node
                let newName = nameMap.get(name)
                if (newName == undefined) {
                    newName = `_${count++}`
                    names.push(name)
                    nameMap.set(name, newName)
                }
                path.replaceWith(t.identifier(newName))
                path.skip()
            }
        })
        path.replaceWith(t.callExpression(
            t.callExpression(
                t.memberExpression(t.identifier(getFunctionName), t.identifier("constructor")),
                [...names.map(name => t.stringLiteral(nameMap.get(name) ?? "_")), t.stringLiteral(path.toString())]
            ),
            names.map(t.identifier)
        ))
    }
}

module.exports = function () {
    return { visitor }
}
