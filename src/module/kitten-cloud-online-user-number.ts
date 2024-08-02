import { Signal } from "../utils/signal"

/**
 * 在线用户数变化消息，当在线用户数发生变化时会收到该消息，详见 {@link KittenCloudOnlineUserNumber.changed}
 */
export type KittenCloudOnlineUserNumberChangObject = {
    originalNumber: number,
    newNumber: number
}

/**
 * 提供在线用户数相关功能。
 */
export class KittenCloudOnlineUserNumber {

    /**
     * 在线用户数变化时会触发该信号，并提供原有在线用户数和新在线用户数。
     *
     * 在线用户数变化消息详见 {@link KittenCloudOnlineUserNumberChangObject}
     */
    public readonly changed: Signal<KittenCloudOnlineUserNumberChangObject>

    public constructor(
        /**
         * 当前在线用户数。
         */
        public value: number
    ) {
        this.changed = new Signal()
    }

    public update(
        this: this,
        { total }: { total: number }
    ): void {
        const originalNumber = this.value
        const newNumber = total
        this.value = newNumber
        this.changed.emit({
            originalNumber,
            newNumber
        })
    }
}
