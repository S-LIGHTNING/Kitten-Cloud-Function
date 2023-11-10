const types = {
    type: "SLIGHTNING_KITTEN_CLOUD_FUNCTION",
    title: "源码云功能",
    icon: "icon-widget-cloud-room",
    isInvisibleWidget: true,
    isGlobalWidget: true,
    properties: [
        {
            key: "autoReconnect",
            label: "自动重连", 
            valueType: "boolean",
            defaultValue: true
        },
        {
            key: "cacheTime",
            label: "缓存时间", 
            valueType: "number",
            defaultValue: 0
        }
    ],
    methods: [
        {
            key: "connect",
            label: "连接",
            params: [
                {
                    key: "theWorkID",
                    label: "到",
                    valueType: "number",
                    defaultValue: 0
                }
            ],
            blockOptions: {
                color: "#e7729b",
                callMethodLabel: false,
                line: "连接" 
            }
        },
        {
            key: "disconnect",
            label: "断开",
            params: [],
            blockOptions: {
                color: "#e7729b",
                callMethodLabel: false
            }
        },
        {
            key: "connectedWorkID",
            label: "已连接作品编号",
            params: [],
            valueType: "number",
            blockOptions: {
                color: "#e7729b",
                callMethodLabel: false,
                space: 40
            }
        },
        {
            key: "get",
            params: [
                {
                    key: "varName",
                    valueType: "string",
                    defaultValue: "云变量"
                }
            ],
            valueType: "string",
            blockOptions: {
                color: "#ed7477",
                callMethodLabel: false,
                line: "云变量" 
            }
        },
        {
            key: "set",
            label: "设置",
            params: [
                {
                    key: "varName",
                    labelAfter: "的值",
                    valueType: "string",
                    defaultValue: "云变量"
                },
                {
                    key: "value",
                    label: "为",
                    valueType: "string",
                    defaultValue: "新的值"
                }
            ],
            blockOptions: {
                color: "#ed7477",
                callMethodLabel: false,
                space: 40
            }
        },
        {
            key: "userName",
            label: "用户昵称",
            params: [],
            valueType: "string",
            blockOptions: {
                color: "#eb7a52",
                callMethodLabel: false,
                line: "用户信息" 
            }
        },
        {
            key: "userID",
            label: "用户编号",
            params: [],
            valueType: "number",
            blockOptions: {
                color: "#eb7a52",
                callMethodLabel: false,
            }
        },
        {
            key: "onlineUsersNumber",
            label: "在线用户数",
            params: [],
            valueType: "number",
            blockOptions: {
                color: "#eb7a52",
                callMethodLabel: false,
                space: 40
            }
        },
        {
            key: "append",
            label: "添加",
            params: [
                {
                    key: "value",
                    valueType: "string",
                    defaultValue: "值"
                },
                {
                    key: "listName",
                    label: "到",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "position",
                    valueType: "number",
                    dropdown: [
                        { label: "末尾", value: 0 },
                        { label: "头部", value: 1 }
                    ]
                }
            ],
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false,
                line: "云列表" 
            }
        },
        {
            key: "insert",
            label: "插入",
            params: [
                {
                    key: "value",
                    valueType: "string",
                    defaultValue: "值"
                },
                {
                    key: "listName",
                    label: "到",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                },
                {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                },
                {
                    key: "position",
                    valueType: "number",
                    dropdown: [
                        { label: "后", value: 0 },
                        { label: "前", value: 1 }
                    ]
                }
            ],
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "delete",
            label: "删除",
            params: [
                {
                    key: "listName",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                },
                {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }
            ],
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "deleteAll",
            label: "删除",
            params: [
                {
                    key: "listName",
                    labelAfter: "所有项",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "replace",
            label: "替换",
            params: [
                {
                    key: "listName",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                },
                {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                },
                {
                    key: "value",
                    label: "为",
                    valueType: "string",
                    defaultValue: "值"
                }
            ],
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false,
                space: 40
            }
        },
        {
            key: "listGet",
            params: [
                {
                    key: "listName",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                },
                {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }
            ],
            valueType: "string",
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "listLength",
            params: [
                {
                    key: "listName",
                    labelAfter: "的项数",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            valueType: "number",
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "listFind",
            params: [
                {
                    key: "listName",
                    labelAfter: "中",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                },
                {
                    key: "count",
                    label: "第",
                    labelAfter: "个",
                    valueType: "number",
                    defaultValue: 1
                },
                {
                    key: "value",
                    labelAfter: "的位置",
                    valueType: "string",
                    defaultValue: "值"
                }

            ],
            valueType: "number",
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        },
        {
            key: "listContain",
            params: [
                {
                    key: "listName",
                    labelAfter: "中",
                    valueType: "string",
                    defaultValue: "云列表"
                },
                {
                    key: "value",
                    label: "包含",
                    valueType: "string",
                    defaultValue: "值"
                }

            ],
            valueType: "boolean",
            blockOptions: {
                color: "#e18528",
                callMethodLabel: false
            }
        }
    ],
    events: [
        {
            key: "onInit",
            label: "连接完成",
            params: []
        },
        {
            key: "onError",
            label: "连接出现错误",
            params: []
        },
        {
            key: "onVarInit",
            label: "云数据初始化",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                },
                {
                    key: "value",
                    label: "值",
                    valueType: "string"
                },
                {
                    key: "type",
                    label: "类型",
                    valueType: "string"
                },
                {
                    key: "cvid",
                    label: "CVID",
                    valueType: "string"
                }
            ]
        },
        {
            key: "onCloudListInit",
            label: "云列表初始化完成",
            params: []
        },
        {
            key: "onListInitFailed",
            label: "云列表初始化失败",
            params: []
        },
        {
            key: "onPublicVarChange",
            label: "公有云变量改变",
            params: [
                {
                    key: "varName",
                    label: "变量名",
                    valueType: "string"
                },
                {
                    key: "varValue",
                    label: "变量值",
                    valueType: "string"
                }
            ]
        },
        {
            key: "onOnlineUsersNumberChange",
            label: "在线用户数改变",
            params: []
        },
        {
            key: "onUserInformationObtained",
            label: "用户信息获取完成",
            params: []
        }
    ]
}

var workID = 0
var connection = null
var ping = null
var vars = null
var onlineUsersNumber = 0

var publicVarUpdates = {}
var privateVarLastUpdateTime = 0
var privateVarUpdates = {}
var listUpdates = {}

var userID = 0
var userName = "获取中……"

class Widget extends InvisibleWidget {

    constructor(props) {
        super(props)

        this.autoReconnect = props.autoReconnect
        this.cacheTime = props.cacheTime

        this.loadUserInfo()
    }

    loadUserInfo = () => {
        const axios = require("axios")
        axios({
            method: "get",
            url: "https://api.codemao.cn/tiger/v3/web/accounts/profile",
            withCredentials: true
        }).then((response) => {
            const { data } = response
            userID = data.id
            userName = data.nickname
            this.emit("onUserInformationObtained")
        }).catch((error) => {
            userName = "获取用户信息失败"
            const { response } = error
            if (response) {
                const { data } = response
                if (data.error_code == "E_0") {
                    userName = "未登录用户"
                    this.widgetWarn("用户未登录编程猫账号，无法使用源码云功能")
                } else
                    this.widgetError(`获取用户信息失败：${data.error_message}`)
            } else if (error.request) {
                this.widgetError("获取用户信息失败：请已发送，但未收到响应")
            } else {
                this.widgetError("获取用户信息失败：请求发送失败")
            }
            console.log(error.toJSON())
            this.emit("onUserInformationObtained")
        })
    }

    connect = (theWorkID) => {
        if (workID != 0) {
            this.widgetWarn("上一个连接未断开")
            this.disconnect()
        }
        workID = theWorkID
        this.widgetLog(`正在连接到 ${workID}……`)
        var V = new Function("return " + "Web" + "Socket") ()
        var a = "socketcv"
        var b = "codemao"
        var c = "cn"
        var port = "9096"
        connection = new V(`wss://${a}.${b}.${c}:${port}/cloudstorage/?session_id=${workID}&authorization_type=1&stag=1&EIO=3&transport=websocket`);
        connection.onmessage = (message) => {
            var { data } = message
            if (data == "1") {
                if (this.autoReconnect) {
                    this.widgetWarn("连接异常断开，即将自动重连")
                    clearInterval(ping)
                    workID = 0
                    this.connect(theWorkID)
                } else {
                    this.widgetError("连接异常断开")
                    this.emit("onError")
                }
            }
            else if (data == "40") {
                connection.send(`42["join","${workID}"]`)
            } else if (data.startsWith("42")) {
                data = JSON.parse(data.substring(2))
                message = data[0]
                data = data[1]
                switch (message) {
                    case "connect_done":
                        connection.send(`42["list_variables",{}]`)
                        this.widgetLog("正在加载云变量……")
                        break
                    case "list_variables_done":
                        data = JSON.parse(data)
                        if (vars == null) {
                            vars = {}
                            var firstList = true
                            data.forEach(varInfo => {
                                vars[varInfo.name] = varInfo
                                vars[varInfo.cvid] = varInfo
                                if (varInfo.type == 2 && firstList) {
                                    this.listInit()
                                    firstList = false
                                }
                                this.emit("onVarInit", varInfo.name, varInfo.value, varInfo.type, varInfo.cvid)
                            })
                            this.widgetLog("连接初始化成功")
                            data.forEach(varInfo => {
                                this.emit("onVarChange", varInfo.name, varInfo.value)
                            })
                        } else {
                            data.forEach(varInfo => {
                                this.varUpdate(varInfo.name, varInfo.value)
                            })
                        }
                        ping = setInterval(() => {
                            connection.send("2")
                        }, 25000)
                        this.emit("onInit")
                        break
                    case "update_vars_done":
                        if (data == "fail") {
                            this.widgetError("公有云变量更新失败")
                        }
                        data.forEach(varValueInfo => {
                            this.varUpdate(varValueInfo.cvid, varValueInfo.value)
                        })
                        break
                    case "update_private_vars_done":
                        data = JSON.parse(data)
                        if (data.code == -1 && data.msg == "fail") {
                            this.widgetError("私有云变量更新失败")
                        }
                    case "update_lists_done":
                        Object.keys(data).forEach(cvid => {
                            data[cvid].forEach(updateInfo => {
                                var value = vars[cvid].value
                                switch (updateInfo.action) {
                                    case "append":
                                        value.push(updateInfo.value)
                                        break
                                    case "unshift":
                                        value.unshift(updateInfo.value)
                                        break
                                    case "insert":
                                        value.splice(updateInfo.nth - 1, 0, updateInfo.value)
                                        break
                                    case "delete":
                                        switch (updateInfo.nth) {
                                            case "last":
                                                value.splice(-1, 1)
                                                break
                                            case "all":
                                                value.splice(0)
                                                break
                                            default:
                                                value.splice(updateInfo.nth - 1, 1)
                                                break
                                        }
                                        break
                                    case "replace":
                                        var index = updateInfo.nth
                                        if (index == "last") {
                                            index = -1
                                        } else {
                                            index--
                                        }
                                        value.splice(index, 1, updateInfo.value)
                                        break
                                }
                            })
                        })
                        break
                    case "online_users_change":
                        data = JSON.parse(data)
                        onlineUsersNumber = data.total
                        this.emit("onOnlineUsersNumberChange")
                        break
                }
            }
        }
        connection.onerror = (message) => {
            this.widgetError("连接发生错误")
            this.emit("onError")
            this.clean()
        }
        connection.onclose = (message) => {
            if (workID != 0) {
                if (this.autoReconnect) {
                    this.widgetWarn("连接异常断开，即将自动重连")
                    clearInterval(ping)
                    workID = 0
                    this.connect(theWorkID)
                } else {
                    this.widgetError("连接异常断开")
                    this.emit("onError")
                    this.clean()
                }
            }
        }
    }

    listInit = () => {
        this.widgetLog(`正在初始化云列表……`)
        const axios = require("axios")
        axios({
            method: "get",
            url: `https://api-creation.codemao.cn/kitten/r2/work/player/load/${workID}`,
        }).then((response) => {
            const { data } = response
            var codeURL = data.source_urls[0]
            axios({
                method: "get",
                url: codeURL,
            }).then((response) => {
                const { data } = response
                Object.values(data.cloud_variables).forEach(varInfo => {
                    if (varInfo.type == "public_list") {
                        vars[varInfo.cvid].id = varInfo.id
                    }
                })
                this.widgetLog("云列表初始化成功")
                this.emit("onCloudListInit")
            }).catch((error) => {
                const { response } = error
                if (response) {
                    this.widgetError(`初始化云列表失败：获取作品失败：${data.error_message}`)
                } else if (error.request) {
                    this.widgetError("初始化云列表失败：获取作品失败：请已发送，但未收到响应")
                } else {
                    this.widgetError("初始化云列表失败：获取作品失败：请求发送失败")
                }
                console.log(error.toJSON())
                this.emit("onListInitFailed")
            })
        }).catch((error) => {
            const { response } = error
            if (response) {
                this.widgetError(`初始化云列表失败：获取作品信息失败：${data.error_message}`)
            } else if (error.request) {
                this.widgetError("初始化云列表失败：获取作品信息失败：请已发送，但未收到响应")
            } else {
                this.widgetError("初始化云列表失败：获取作品信息失败：请求发送失败")
            }
            console.log(error.toJSON())
            this.emit("onListInitFailed")
        })
    }

    disconnect = () => {
        clearInterval(ping)
        connection.send("41")
        connection.close()
        this.widgetLog(`已断开与 ${workID} 的连接`)
        this.clean()
    }

    connectedWorkID = () => {
        return workID
    }

    clean = () => {
        workID = 0
        connection = null
        ping = null
        vars = null
        onlineUsersNumber = 0
        publicVarUpdates = {}
        privateVarLastUpdateTime = 0
        privateVarUpdates = {}
        listUpdates = {}
    }

    varUpdate = (varName, value)=> {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var varInfo = vars[varName]
        if (typeof varInfo == "undefined") {
            this.widgetError(`云变量 ${varName} 不存在`)
            return
        }
        if (varInfo.value != value) {
            varInfo.value = value
            this.emit("onPublicVarChange", varInfo.name, value)
        }
    }

    get = (varName) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var varInfo = vars[varName]
        if (typeof varInfo == "undefined") {
            this.widgetError(`云变量 ${varName} 不存在`)
            return
        }
        if (varInfo.type == 2) {
            this.widgetError(`不能通过云变量积木获取云列表 ${varName} 的值`)
            return
        }
        return varInfo.value
    }

    set = (varName, value) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var varInfo = vars[varName]
        if (typeof varInfo == "undefined") {
            this.widgetError(`云变量 ${varName} 不存在`)
            return
        }
        if (varInfo.type == 2) {
            this.widgetError(`不能对云列表 ${varName} 进行赋值操作`)
            return
        }
        value = this.value(value)
        if (varInfo.value != value) {
            varInfo.value = value
        }

        var updateInfo = {
            cvid: varInfo.cvid,
            value: value,
            action: "set",
            param_type: typeof value
        }

        if (varInfo.type == 0) {
            if (Object.keys(privateVarUpdates).length == 0) {
                setTimeout(() => {
                    this.sendVarUpdateInfo(privateVarUpdates, "update_private_vars")
                    privateVarUpdates = {}
                    privateVarLastUpdateTime = Date.now()
                }, Math.max(this.cacheTime, privateVarLastUpdateTime + 1500 - Date.now()))
            }
            privateVarUpdates[varInfo.cvid] = updateInfo
        }
        if (varInfo.type == 1) {
            if (Object.keys(publicVarUpdates).length == 0) {
                setTimeout(() => {
                    this.sendVarUpdateInfo(publicVarUpdates, "update_vars")
                    publicVarUpdates = {}
                }, this.cacheTime)
            }
            publicVarUpdates[varInfo.cvid] = updateInfo
            this.emit("onPublicVarChange", varInfo.name, value)
        }
    }

    sendVarUpdateInfo = (dict, message) => {
        connection.send(`42${
            JSON.stringify([
                message,
                Object.values(dict)
            ])
        }`)
    }

    append = (value, listName, position) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        value = this.value(value)
        var action = ["append", "unshift"][position]
        var updateInfo = {
            id: listInfo.id,
            cvid: listInfo.cvid,
            value: value,
            action: action,
        }
        if (Object.keys(listUpdates).length == 0) {
            setTimeout(() => {
                this.sendListUpdateInfo(listUpdates)
                listUpdates = {}
            }, this.cacheTime)
        }
        var updateInfoList = listUpdates[listInfo.cvid]
        if (typeof updateInfoList == "undefined") {
            updateInfoList = []
            listUpdates[listInfo.cvid] = updateInfoList
        }
        updateInfoList.push(updateInfo)
    }

    insert = (value, listName, countingMode, index, position) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        value = this.value(value)
        index = this.index(listInfo.value, index, countingMode)
        if (position == 1) {
            index--
        }
        var updateInfo = {
            id: listInfo.id,
            cvid: listInfo.cvid,
            nth: index,
            value: value,
            action: "insert",
        }
        if (Object.keys(listUpdates).length == 0) {
            setTimeout(() => {
                this.sendListUpdateInfo(listUpdates)
                listUpdates = {}
            }, this.cacheTime)
        }
        var updateInfoList = listUpdates[listInfo.cvid]
        if (typeof updateInfoList == "undefined") {
            updateInfoList = []
            listUpdates[listInfo.cvid] = updateInfoList
        }
        updateInfoList.push(updateInfo)
    }

    delete = (listName, countingMode, index) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        if (countingMode == 1 && index == 1) {
            index = "last"
        } else {
            index = this.index(listInfo.value, index, countingMode)
        }
        var updateInfo = {
            id: listInfo.id,
            cvid: listInfo.cvid,
            nth: index,
            action: "delete",
        }
        if (Object.keys(listUpdates).length == 0) {
            setTimeout(() => {
                this.sendListUpdateInfo(listUpdates)
                listUpdates = {}
            }, this.cacheTime)
        }
        var updateInfoList = listUpdates[listInfo.cvid]
        if (typeof updateInfoList == "undefined") {
            updateInfoList = []
            listUpdates[listInfo.cvid] = updateInfoList
        }
        updateInfoList.push(updateInfo)
    }

    deleteAll = (listName) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        var updateInfo = {
            id: listInfo.id,
            cvid: listInfo.cvid,
            nth: "all",
            action: "delete",
        }
        if (Object.keys(listUpdates).length == 0) {
            setTimeout(() => {
                this.sendListUpdateInfo(listUpdates)
                listUpdates = {}
            }, this.cacheTime)
        }
        var updateInfoList = listUpdates[listInfo.cvid]
        if (typeof updateInfoList == "undefined") {
            updateInfoList = []
            listUpdates[listInfo.cvid] = updateInfoList
        }
        updateInfoList.push(updateInfo)
    }

    replace = (listName, countingMode, index, value) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        value = this.value(value)
        if (countingMode == 1 && index == 1) {
            index = "last"
        } else {
            index = this.index(listInfo.value, index, countingMode)
        }
        var updateInfo = {
            id: listInfo.id,
            cvid: listInfo.cvid,
            nth: index,
            value: value,
            action: "replace",
        }
        if (Object.keys(listUpdates).length == 0) {
            setTimeout(() => {
                this.sendListUpdateInfo(listUpdates)
                listUpdates = {}
            }, this.cacheTime)
        }
        var updateInfoList = listUpdates[listInfo.cvid]
        if (typeof updateInfoList == "undefined") {
            updateInfoList = []
            listUpdates[listInfo.cvid] = updateInfoList
        }
        updateInfoList.push(updateInfo)
    }

    listGet = (listName, countingMode, index) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        var list = listInfo.value
        index = this.index(list, index, countingMode) - 1
        return list[index] || 0
    }

    listLength = (listName) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        return listInfo.value.length
    }

    listFind = (listName, countingMode, count, value) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        var list = listInfo.value
        var counting = 0
        if (countingMode == 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == value) {
                    if (++counting == count) {
                        return i + 1
                    }
                }
            }
        } else {
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i] == value) {
                    if (++counting == count) {
                        return i + 1
                    }
                }
            }
        }
        return 0
    }

    listContain = (listName, value) => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        var listInfo = vars[listName]
        if (typeof listInfo == "undefined") {
            this.widgetError(`云列表 ${listName} 不存在`)
            return
        }
        if (listInfo.type != 2) {
            this.widgetError(`不能对云变量 ${listName} 进行列表操作`)
            return
        }
        return listInfo.value.includes(value)
    }

    sendListUpdateInfo = (dict) => {
        connection.send(`42${
            JSON.stringify([
                "update_lists",
                dict
            ])
        }`)
    }

    value = (value) => {
        var numberValue = Number(value)
        if (!isNaN(numberValue)) return numberValue
        if (value.length > 1024) {
            value = value.substring(1024)
            this.widgetWarn("字符串长度超出限制（1024 字符），已舍弃超出部分")
        }
        return value
    }

    index = (list, index, countingMode) => {
        if (countingMode == 0) {
            return index
        } else {
            return list.length - index + 1
        }
    }

    userName = () => {
        return userName
    }

    userID = () => {
        return userID
    }

    onlineUsersNumber = () => {
        if (workID == 0) {
            this.widgetError("未连接到云")
            return
        }
        return onlineUsersNumber
    }
}

exports.types = types;
exports.widget = Widget;
