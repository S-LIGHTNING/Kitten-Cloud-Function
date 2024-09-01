"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codemao_work_1 = require("../../codemao/work/codemao-work");
var codemao_work_type_1 = require("../../codemao/work/codemao-work-type");
var kitten_cloud_function_1 = require("../../kitten-cloud-function");
var kitten_cloud_data_1 = require("../../module/cloud-data/kitten-cloud-data");
var kitten_cloud_variable_1 = require("../../module/cloud-data/kitten-cloud-variable");
var kitten_cloud_private_variable_1 = require("../../module/cloud-data/kitten-cloud-private-variable");
var kitten_cloud_public_variable_1 = require("../../module/cloud-data/kitten-cloud-public-variable");
var kitten_cloud_data_update_source_1 = require("../../module/cloud-data/update/kitten-cloud-data-update-source");
var codemao_user_sex_1 = require("../../codemao/user/codemao-user-sex");
Object.assign(window, {
    CodemaoUserSex: codemao_user_sex_1.CodemaoUserSex,
    CodemaoWork: codemao_work_1.CodemaoWork,
    CodemaoWorkType: codemao_work_type_1.CodemaoWorkType,
    KittenCloudFunction: kitten_cloud_function_1.KittenCloudFunction,
    KittenCloudData: kitten_cloud_data_1.KittenCloudData,
    KittenCloudVariable: kitten_cloud_variable_1.KittenCloudVariable,
    KittenCloudPrivateVariable: kitten_cloud_private_variable_1.KittenCloudPrivateVariable,
    KittenCloudPublicVariable: kitten_cloud_public_variable_1.KittenCloudPublicVariable,
    KittenCloudDataUpdateSource: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource
});
