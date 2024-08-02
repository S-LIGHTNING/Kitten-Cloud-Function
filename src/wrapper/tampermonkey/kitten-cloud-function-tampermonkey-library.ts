import { CodemaoWork } from "../../codemao/work/codemao-work"
import { CodemaoWorkType } from "../../codemao/work/codemao-work-type"
import { KittenCloudFunction } from "../../kitten-cloud-function"
import { KittenCloudData } from "../../module/cloud-data/kitten-cloud-data"
import { KittenCloudVariable } from "../../module/cloud-data/kitten-cloud-variable"
import { KittenCloudPrivateVariable } from "../../module/cloud-data/kitten-cloud-private-variable"
import { KittenCloudPublicVariable } from "../../module/cloud-data/kitten-cloud-public-variable"
import { KittenCloudDataUpdateSource } from "../../module/cloud-data/update/kitten-cloud-data-update-source"
import { CodemaoUserSex } from "../../codemao/user/codemao-user-sex"

Object.assign(window, {
    CodemaoUserSex,
    CodemaoWork,
    CodemaoWorkType,
    KittenCloudFunction,
    KittenCloudData,
    KittenCloudVariable,
    KittenCloudPrivateVariable,
    KittenCloudPublicVariable,
    KittenCloudDataUpdateSource
})
