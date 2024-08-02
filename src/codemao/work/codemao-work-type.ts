/** 作品类型。*/ export class CodemaoWorkType {

    /** 作品使用 NEMO 创作。*/ static readonly NEMO: CodemaoWorkType = new CodemaoWorkType("NEMO")
    /** 作品使用 KITTEN 创作。*/ static readonly KITTEN: CodemaoWorkType = new CodemaoWorkType("KITTEN")

    static from(argument: string | CodemaoWorkType): CodemaoWorkType {
        if (argument instanceof CodemaoWorkType) {
            return argument
        }
        return CodemaoWorkType.parse(argument)
    }

    static parse(type: string): CodemaoWorkType {
        type = type.toUpperCase()
        if (!(type in typeMap)) {
            throw new Error(`无法识别的作品类型：${type}`)
        }
        return typeMap[type as keyof typeof typeMap]
    }

    /** 作品类型名称。*/ public readonly name: string
    /** 作品类型符号。*/ public readonly symbol: symbol

    private constructor(name: string) {
        this.name = name
        this.symbol = Symbol(name)
    }

    public toString() {
        return this.name
    }
}

const typeMap = {
    "NEMO": CodemaoWorkType.NEMO,
    "KITTEN": CodemaoWorkType.KITTEN,
    "KITTEN2": CodemaoWorkType.KITTEN,
    "KITTEN3": CodemaoWorkType.KITTEN,
    "KITTEN4": CodemaoWorkType.KITTEN
}
