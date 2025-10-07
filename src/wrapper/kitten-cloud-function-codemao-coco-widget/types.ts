import { None } from "../../utils/other"
import { KittenCloudVariableValue } from "../../module/cloud-data/kitten-cloud-variable"
import { ArrayType, BlockType, BooleanType, Color, IntegerType, MethodBlockParam, NumberType, StringType, Types, UnionType } from "slightning-coco-widget"
import { project } from "../../project"
import { KittenCloudAutoReconnectIntervalTime, KittenCloudCacheTime, KittenCloudUploadIntervalTime } from "../../module/kitten-cloud-function-config-layer"
import { KittenCloudListItemValue } from "../kitten-cloud-function-package"

function variableValueType(defaultValue?: KittenCloudVariableValue | None) {
    if (typeof defaultValue == "number") {
        return new UnionType<KittenCloudVariableValue>(
            new NumberType(defaultValue),
            new StringType()
        )
    } else {
        return new UnionType<KittenCloudVariableValue>(
            new StringType(typeof defaultValue == "string" ? defaultValue : None),
            new NumberType()
        )
    }
}
function listItemValueType(defaultValue?: KittenCloudVariableValue | None) {
    if (typeof defaultValue == "number") {
        return new UnionType<KittenCloudListItemValue>(
            new NumberType(defaultValue),
            new StringType()
        )
    } else {
        return new UnionType<KittenCloudListItemValue>(
            new StringType(typeof defaultValue == "string" ? defaultValue : None),
            new NumberType()
        )
    }
}
const AutoReconnectIntervalTimeType = new UnionType<KittenCloudAutoReconnectIntervalTime>(new NumberType(8000), new BooleanType())
const CacheTimeType = new UnionType<KittenCloudCacheTime>(new NumberType(0), new BooleanType())
const UploadIntervalTimeType = new UnionType<KittenCloudUploadIntervalTime>(new NumberType(0), new BooleanType())

export const types: Types = {
    type: "SLIGHTNING_KITTEN_CLOUD_FUNCTION_WIDGET",
    info: {
        title: project.name,
        icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_fdJQGXFAe_1759824935695.svg",
        author: project.author,
        version: project.version,
        category: "编程猫",
        url: project
    },
    options: {
        visible: false,
        global: true
    },
    properties: [],
    methods: [
        { label: "连接", blockOptions: {
            color: Color.PURPLE,
            icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_ry8y2wOOR_1759828549341.svg"
        }, contents: [
            { contents: [
                {
                    key: "connect",
                    label: "连接",
                    block: ["连接到", ["workID", "作品 ID", 0]]
                }, {
                    key: "close",
                    label: "关闭连接",
                    block: [MethodBlockParam.METHOD]
                }, {
                    key: "isConnected",
                    label: "已连接",
                    block: [MethodBlockParam.METHOD],
                    returns: new BooleanType()
                }, {
                    key: "connectedWorkID",
                    label: "已连接作品编号",
                    block: [MethodBlockParam.METHOD],
                    returns: new NumberType()
                }
            ] },
            { blockOptions: {
                icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_4oSNESaXX_1759824924049.png"
            }, contents: [
                [BlockType.EVENT, "onOpen", "连接打开", []],
                [BlockType.EVENT, "onClose", "连接关闭",[]],
                [BlockType.EVENT, "onError", "出现错误", [["message", "信息", new StringType()]]]
            ] }
        ] },
        { label: "云变量", blockOptions: {
            color: Color.BROWN,
            icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_3PirhqSB8_1759829116892.svg"
        }, contents: [
            { contents: [
                {
                    key: "getPrivateVariableList",
                    label: "私有云变量列表",
                    block: [MethodBlockParam.METHOD],
                    returns: new ArrayType()
                }, {
                    key: "getPublicVariableList",
                    label: "公有云变量列表",
                    block: [MethodBlockParam.METHOD],
                    returns: new ArrayType()
                }
            ] },
            { contents: [
                {
                    key: "variableGet",
                    label: "云变量获取",
                    block: [["name", "名称", "云变量"]],
                    returns: variableValueType()
                }, {
                    key: "variableSet",
                    label: "云变量设置",
                    block: [
                        "设置", ["name", "名称", "云变量"], "的值为",
                        ["value", "值", variableValueType("新的值")]
                    ]
                }
            ] },
            { contents: [
                {
                    key: "getRankingList",
                    label: "获取私有云变量排行榜",
                    block: [
                        ["name", "名称", "私有云变量"],
                        "前", ["limit", "限制", new IntegerType(31)], "名",
                        ["order", "顺序", [["逆序", "-1"], ["正序", "1"]]], "的排行榜"
                    ],
                    returns: new ArrayType()
                }
            ] },
            { blockOptions: {
                icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_4oSNESaXX_1759824924049.png"
            }, contents: [
                {
                    type: BlockType.EVENT,
                    key: "onPublicVariableValueChanged",
                    label: "公有云变量值改变",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["originalValue", "原值", variableValueType()],
                        ["newValue", "新值", variableValueType()]
                    ]
                }
            ] }
        ] },
        { label: "用户", blockOptions: {
            color: Color.RED,
            icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE__N2QqHCFw_1759829827259.svg"
        }, contents: [
            { contents: [
                {
                    key: "isUserLoggedIn",
                    label: "用户已登录",
                    block: [MethodBlockParam.METHOD],
                    returns: new BooleanType()
                }, {
                    key: "userLogIn",
                    label: "用户登录",
                    block: [MethodBlockParam.METHOD],
                    returns: new BooleanType()
                }, {
                    key: "getUserInfo",
                    label: "获取用户信息",
                    block: [
                        "ID 为", ["userID", "用户 ID", new IntegerType(0)], "的用户", "的",
                        ["type", "类型", [
                            ["ID", "id"],
                            ["用户名", "username"],
                            ["昵称", "nickname"],
                            ["真实姓名", "realname"],
                            ["头像地址", "avatarURL"],
                            ["背景图片地址", "coverURL"],
                            ["描述", "description"],
                            ["正在做", "doing"],
                            ["邮箱", "email"],
                            ["级别", "level"],
                            ["等级", "grade"],
                            ["生日", "birthday"],
                            ["性别", "sex"],
                            ["总被被浏览次数", "viewTimes"],
                            ["总被被点赞次数", "praiseTimes"],
                            ["总被被收藏次数", "collectTimes"],
                            ["总被被再创作次数", "forkTimes"]
                        ]]
                    ],
                    returns: new UnionType<string | number>(new StringType(), new NumberType())
                }, {
                    key: "getOnlineUsersNumber",
                    label: "在线用户数",
                    block: [MethodBlockParam.METHOD],
                    returns: new NumberType()
                }
            ] },
            { blockOptions: {
                icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_4oSNESaXX_1759824924049.png"
            }, contents: [
                {
                    type: BlockType.EVENT,
                    key: "onOnlineUsersNumberChanged",
                    label: "在线用户数改变",
                    params: [
                        ["originalNumber", "原数量", new NumberType()],
                        ["newNumber", "新数量", new NumberType()]
                    ]
                }
            ] }
        ] },
        { label: "云列表", blockOptions: {
            color: Color.YELLOW,
            icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_f5o3mT36-_1759829425563.svg"
        }, contents: [
            { contents: [
                {
                    key: "getListList",
                    label: "云列表列表",
                    block: [MethodBlockParam.METHOD],
                    returns: new ArrayType()
                }
            ] },
            { contents: [
                {
                    key: "getListCopy",
                    label: "获取云列表副本",
                    block: [["name", "名称", "云列表"], "副本"],
                    returns: new ArrayType()
                }, {
                    key: "listAppend",
                    label: "云列表添加到头尾",
                    block: [
                        "添加", ["value", "值", listItemValueType("值")],
                        "到", ["name", "名称", "云列表"],
                        ["position","位置", [["头部", "head"], ["尾部", "tail"]]]
                    ]
                }, {
                    key: "listAdd",
                    label: "云列表添加到指定项",
                    block: [
                        "添加", ["value", "值", listItemValueType("值")],
                        "到", ["name", "名称", "云列表"],
                        ["indexingMode", "索引模式", [["正数", "forward"], ["倒数", "backward"]]],
                        "第", ["index", "索引", new IntegerType(1)], "项"
                    ]
                }, {
                    key: "listRemove",
                    label: "云列表移除",
                    block: [
                        "移除", ["name", "名称", "云列表"],
                        ["indexingMode", "索引模式", [["正数", "forward"], ["倒数", "backward"]]],
                        "第", ["index", "索引", 1], "项"
                    ]
                }, {
                    key: "listEmpty",
                    label: "云列表清空",
                    block: ["清空", ["name", "名称", "云列表" ]]
                }, {
                    key: "listReplace",
                    label: "云列表替换",
                    block: [
                        "替换", ["name", "名称", "云列表"],
                        ["indexingMode", "索引模式", [["正数", "forward"], ["倒数", "backward"]]],
                        "第", ["index", "索引", 1], "项",
                        "为", ["value", "值", listItemValueType("值")]
                    ]
                }, {
                    key: "listCopy",
                    label: "云列表复制",
                    block: [
                        "复制", ["list1name", "列表1", new UnionType<string | unknown[]>(new StringType("列表（可放入本地列表）"), new ArrayType())],
                        "到", ["list2name", "列表2", "云列表"]
                    ]
                }
            ] },
            { contents: [
                {
                    key: "listGet",
                    label: "云列表获取",
                    block: [
                        ["name", "名称", "云列表"],
                        ["indexingMode", "索引模式", [["正数", "forward"], ["倒数", "backward"]]],
                        "第", ["index", "索引", 1], "项",
                    ],
                    returns: listItemValueType()
                }, {
                    key: "listLength",
                    label: "云列表项数",
                    block: [["name", "名称", "云列表"], "的项数"],
                    returns: new IntegerType()
                }, {
                    key: "listFind",
                    label: "云列表查找",
                    block: [
                        ["name", "名称", "云列表"], "中",
                        ["countingMode", "计数模式", [["正数", "forward"], ["倒数", "backward"]]],
                        "第", ["count", "计数", 1], "个",
                        ["value", "值", listItemValueType("值")], "的位置"

                    ],
                    returns: new IntegerType()
                }, {
                    key: "listContain",
                    label: "云列表包含",
                    block: [
                        ["name", "名称", "云列表"], "中",
                        "包含", ["value", "值", listItemValueType("值")]
                    ],
                    returns: new BooleanType()
                }
            ] },
            { blockOptions: {
                icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_4oSNESaXX_1759824924049.png"
            }, contents: [
                {
                    type: BlockType.EVENT,
                    key: "onListPushed",
                    label: "云列表添加到尾项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["item", "项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListUnshifted",
                    label: "云列表添加到首项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["item", "项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListAdd",
                    label: "云列表添加项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["position", "位置", new StringType()],
                        ["item", "项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListPopped",
                    label: "云列表移除尾项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["item", "项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListRemove",
                    label: "云列表移除项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["position", "位置", new StringType()],
                        ["item", "项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListEmptied",
                    label: "云列表清空",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["list", "列表", new StringType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListReplacedLast",
                    label: "云列表替换尾项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["originalItem", "原项", listItemValueType()],
                        ["newItem", "新项", listItemValueType()]
                    ]
                }, {
                    type: BlockType.EVENT,
                    key: "onListReplaced",
                    label: "云列表替换项",
                    params: [
                        ["name", "名称", new StringType()],
                        ["source", "来源", new StringType()],
                        ["position", "位置", new StringType()],
                        ["originalItem", "原项", listItemValueType()],
                        ["newItem", "新项", listItemValueType()]
                    ]
                }
            ] }
        ] },
        { label: "配置", blockOptions: {
            color: Color.PINK,
            icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
        }, contents: [
            { contents: [
                {
                    key: "getAutoReconnectIntervalTime",
                    label: "获取自动重连间隔时间",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"]
                        ]],
                        ["dataName", "数据名称", ""], "自动重连间隔时间",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]], "的毫秒数"
                    ],
                    returns: AutoReconnectIntervalTimeType
                }, {
                    key: "getLocalPreupdate",
                    label: "获取本地预更新",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "本地预更新",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]]
                    ],
                    returns: new BooleanType()
                }, {
                    key: "getCacheTime",
                    label: "获取缓存时间",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "缓存时间",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]], "的毫秒数"
                    ],
                    returns: CacheTimeType
                }, {
                    key: "getUploadIntervalTime",
                    label: "获取上传间隔时间",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "上传间隔时间",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]], "的毫秒数"
                    ],
                    returns: UploadIntervalTimeType
                }, {
                    key: "getUploadTimeout",
                    label: "获取上传超时时间",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "上传超时时间",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]], "的毫秒数"
                    ],
                    returns: new NumberType()
                }, {
                    key: "getStringLengthLimit",
                    label: "获取字符串长度限制",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "字符串长度限制",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]]
                    ],
                    returns: new IntegerType()
                }, {
                    key: "getListLengthLimit",
                    label: "获取列表长度限制",
                    block: [
                        ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["云列表组", "listGroup"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "列表长度限制",
                        ["type", "类型", [["配置值", "config"], ["生效值", "value"]]]
                    ],
                    returns: new IntegerType()
                }
            ] },
            { contents: [
                {
                    key: "setAutoReconnectIntervalTime",
                    label: "设置自动重连间隔时间",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"]
                        ]],
                        ["dataName", "数据名称", ""], "自动重连间隔时间", "为",
                        ["value", "值", AutoReconnectIntervalTimeType], "毫秒"
                    ]
                }, {
                    key: "setLocalPreupdate",
                    label: "设置本地预更新",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "本地预更新", "为",
                        ["value", "值", new BooleanType(true)]
                    ]
                }, {
                    key: "setCacheTime",
                    label: "设置缓存时间",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "缓存时间", "为",
                        ["value", "值", CacheTimeType], "毫秒"
                    ]
                }, {
                    key: "setUploadIntervalTime",
                    label: "设置上传间隔时间",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "上传间隔时间", "为",
                        ["value", "值", UploadIntervalTimeType], "毫秒"
                    ]
                }, {
                    key: "setUploadTimeout",
                    label: "设置上传超时时间",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "上传超时时间", "为",
                        ["value", "值", new NumberType(4000)], "毫秒"
                    ]
                }, {
                    key: "setStringLengthLimit",
                    label: "设置字符串长度限制",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["私有云变量组", "privateVariableGroup"],
                            ["公有云变量组", "publicVariableGroup"],
                            ["云列表组", "listGroup"],
                            ["云变量", "variable"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "字符串长度限制", "为",
                        ["value", "值", new NumberType(1024)]
                    ]
                }, {
                    key: "setListLengthLimit",
                    label: "设置列表长度限制",
                    block: [
                        "设置", MethodBlockParam.THIS, ["configLayerName", "配置层名称", [
                            ["连接", "connection"],
                            ["云列表组", "listGroup"],
                            ["云列表", "list"]
                        ]],
                        ["dataName", "数据名称", ""], "列表长度限制", "为",
                        ["value", "值", new NumberType(1000)]
                    ]
                }
            ] },
        ] },
        { label: "已弃用", contents: [
            {
                key: "isUserLogged",
                label: "用户已登录",
                block: [MethodBlockParam.METHOD],
                deprecated: true,
                returns: new BooleanType(),
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE__N2QqHCFw_1759829827259.svg"
                }
            }, {
                key: "getConnectionConfigValue",
                label: "获取连接配置",
                block: ["获取", MethodBlockParam.THIS, "连接", ["type", "类型", [
                    ["自动重连间隔时间", "autoReconnectIntervalTime"],
                    ["本地预更新", "localPreupdate"],
                    ["缓存时间", "cacheTime"],
                    ["上传间隔时间", "uploadIntervalTime"],
                    ["字符串长度限制", "stringLengthLimit"],
                    ["列表长度限制", "listLengthLimit"]
                ]]],
                deprecated: true,
                returns: new UnionType<number | boolean>(new NumberType(0), new BooleanType()),
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "setConnectionConfig",
                label: "设置连接配置",
                block: [
                    "设置", MethodBlockParam.THIS, "连接", ["type", "类型", [
                        ["自动重连间隔时间", "autoReconnectIntervalTime"],
                        ["本地预更新", "localPreupdate"],
                        ["缓存时间", "cacheTime"],
                        ["上传间隔时间", "uploadIntervalTime"],
                        ["字符串长度限制", "stringLengthLimit"],
                        ["列表长度限制", "listLengthLimit"]
                    ]],
                    "为", ["value", "值", new UnionType<number | boolean>(new NumberType(0), new BooleanType())]
                ],
                deprecated: true,
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "getPrivateVariableConfigValue",
                label: "获取私有云变量配置",
                block: ["获取", MethodBlockParam.THIS, "私有云变量", ["type", "类型", [
                    ["本地预更新", "localPreupdate"],
                    ["缓存时间", "cacheTime"],
                    ["上传间隔时间", "uploadIntervalTime"],
                    ["字符串长度限制", "stringLengthLimit"]
                ]]],
                deprecated: true,
                returns: new UnionType<number | boolean>(new NumberType(0), new BooleanType()),
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "setPrivateVariableConfig",
                label: "设置私有云变量配置",
                block: [
                    "设置", MethodBlockParam.THIS, "私有云变量", ["type", "类型", [
                        ["本地预更新", "localPreupdate"],
                        ["缓存时间", "cacheTime"],
                        ["上传间隔时间", "uploadIntervalTime"],
                        ["字符串长度限制", "stringLengthLimit"]
                    ]],
                    "为", ["value", "值", new UnionType<number | boolean>(new NumberType(0), new BooleanType())]
                ],
                deprecated: true,
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "getPublicVariableConfigValue",
                label: "获取公有云变量配置",
                block: ["获取", MethodBlockParam.THIS, "公有云变量", ["type", "类型", [
                    ["本地预更新", "localPreupdate"],
                    ["缓存时间", "cacheTime"],
                    ["上传间隔时间", "uploadIntervalTime"],
                    ["字符串长度限制", "stringLengthLimit"]
                ]]],
                deprecated: true,
                returns: new UnionType<number | boolean>(new NumberType(0), new BooleanType()),
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "setPublicVariableConfig",
                label: "设置公有云变量配置",
                block: [
                    "设置", MethodBlockParam.THIS, "公有云变量", ["type", "类型", [
                        ["本地预更新", "localPreupdate"],
                        ["缓存时间", "cacheTime"],
                        ["上传间隔时间", "uploadIntervalTime"],
                        ["字符串长度限制", "stringLengthLimit"]
                    ]],
                    "为", ["value", "值", new UnionType<number | boolean>(new NumberType(0), new BooleanType())]
                ],
                deprecated: true,
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "getListConfigValue",
                label: "获取云列表配置",
                block: ["获取", MethodBlockParam.THIS, "云列表", ["type", "类型", [
                    ["本地预更新", "localPreupdate"],
                    ["缓存时间", "cacheTime"],
                    ["上传间隔时间", "uploadIntervalTime"],
                    ["字符串长度限制", "stringLengthLimit"],
                    ["列表长度限制", "listLengthLimit"]
                ]]],
                deprecated: true,
                returns: new UnionType<number | boolean>(new NumberType(0), new BooleanType()),
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }, {
                key: "setListConfig",
                label: "设置云列表配置",
                block: [
                    "设置", MethodBlockParam.THIS, "云列表", ["type", "类型", [
                        ["本地预更新", "localPreupdate"],
                        ["缓存时间", "cacheTime"],
                        ["上传间隔时间", "uploadIntervalTime"],
                        ["字符串长度限制", "stringLengthLimit"],
                        ["列表长度限制", "listLengthLimit"]
                    ]],
                    "为", ["value", "值", new UnionType<number | boolean>(new NumberType(0), new BooleanType())]
                ],
                deprecated: true,
                blockOptions: {
                    icon: "https://creation.bcmcdn.com/716/appcraft/IMAGE_NXBJRW1_F_1759830380205.svg"
                }
            }
        ] }
    ],
    events: []
}
