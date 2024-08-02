import { KittenCloudFunction } from "../../kitten-cloud-function"
import { KittenCloudFunctionConfigLayer } from "../kitten-cloud-function-config-layer"
import { KittenCloudDataGroup } from "./group/kitten-cloud-data-group"
import { KittenCloudDataUpdateManager } from "./update/kitten-cloud-data-update-manager"

/**
 * 云数据。
 */
export abstract class KittenCloudData extends KittenCloudFunctionConfigLayer {

    public readonly updateManager: KittenCloudDataUpdateManager

    public constructor(
        public readonly connection: KittenCloudFunction,
        public readonly group: KittenCloudDataGroup,
        public cvid: string,
        public name: string
    ) {
        super(group)
        this.updateManager = new KittenCloudDataUpdateManager(connection, this)
    }

    public abstract update(this: this, value: unknown): void

    protected singleValueProcess(this: this, value: unknown): number | string {
        if (typeof value == "number") {
            return value
        }
        if (typeof value != "string") {
            throw new Error(`不支持的值类型：${typeof value}`)
        }
        let stringValue: string = value
        if (stringValue.length > this.stringLengthLimit.value) {
            stringValue = stringValue.slice(0, this.stringLengthLimit.value)
        }
        return stringValue
    }
}
