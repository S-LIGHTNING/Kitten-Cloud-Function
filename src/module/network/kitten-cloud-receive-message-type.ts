export enum KittenCloudReceiveMessageType {
    JOIN = "connect_done",
    RECEIVE_ALL_DATA = "list_variables_done",
    UPDATE_PRIVATE_VARIABLE = "update_private_vars_done",
    RECEIVE_PRIVATE_VARIABLE_RANKING_LIST = "list_ranking_done",
    UPDATE_PUBLIC_VARIABLE = "update_vars_done",
    UPDATE_LIST = "update_lists_done",
    ILLEGAL_EVENT = "illegal_event_done",
    UPDATE_ONLINE_USER_NUMBER = "online_users_change"
}
