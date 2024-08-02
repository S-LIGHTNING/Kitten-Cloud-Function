/** 用户性别。*/ export class CodemaoUserSex {

    /** 用户为男性。*/ static readonly MALE: CodemaoUserSex = new CodemaoUserSex("男")
    /** 用户为女性。*/ static readonly FEMALE: CodemaoUserSex = new CodemaoUserSex("女")

    static from(argument: number | string | CodemaoUserSex): CodemaoUserSex {
        if (argument instanceof CodemaoUserSex) {
            return argument
        }
        return CodemaoUserSex.parse(argument)
    }

    static parse(type: number | string): CodemaoUserSex {
        if (typeof type == "number") {
            type = type.toString()
        }
        type = type.toUpperCase()
        if (!(type in typeMap)) {
            throw new Error(`无法识别的用户性别：${type}`)
        }
        return typeMap[type as keyof typeof typeMap]
    }

    /** 用户性别名称。*/ public readonly name: string
    /** 用户性别符号。*/ public readonly symbol: symbol

    private constructor(name: string) {
        this.name = name
        this.symbol = Symbol(name)
    }

    public toString() {
        return this.name
    }
}

const typeMap = {
    "1": CodemaoUserSex.MALE,
    "MALE": CodemaoUserSex.MALE,
    "0": CodemaoUserSex.FEMALE,
    "FEMALE": CodemaoUserSex.FEMALE
}
