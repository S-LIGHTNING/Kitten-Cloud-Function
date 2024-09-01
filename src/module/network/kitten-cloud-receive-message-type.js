"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudReceiveMessageType = void 0;
var KittenCloudReceiveMessageType;
(function (KittenCloudReceiveMessageType) {
    KittenCloudReceiveMessageType["JOIN"] = "connect_done";
    KittenCloudReceiveMessageType["RECEIVE_ALL_DATA"] = "list_variables_done";
    KittenCloudReceiveMessageType["UPDATE_PRIVATE_VARIABLE"] = "update_private_vars_done";
    KittenCloudReceiveMessageType["RECEIVE_PRIVATE_VARIABLE_RANKING_LIST"] = "list_ranking_done";
    KittenCloudReceiveMessageType["UPDATE_PUBLIC_VARIABLE"] = "update_vars_done";
    KittenCloudReceiveMessageType["UPDATE_LIST"] = "update_lists_done";
    KittenCloudReceiveMessageType["ILLEGAL_EVENT"] = "illegal_event_done";
    KittenCloudReceiveMessageType["UPDATE_ONLINE_USER_NUMBER"] = "online_users_change";
})(KittenCloudReceiveMessageType || (exports.KittenCloudReceiveMessageType = KittenCloudReceiveMessageType = {}));
