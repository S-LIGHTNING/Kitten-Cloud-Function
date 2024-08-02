/**
 * 信号。
 *
 * 当有消息需要向外界发送时，就可以使用信号。
 */
export class Signal<T> {

    public slots: ((message: T) => void)[]

    public constructor() {
        this.slots = []
    }

    /**
     * 连接一个消息接收函数，当有消息被发送时，该函数将被调用。
     *
     * @param slot 接收函数
     */
    public connect(this: this, slot: (message: T) => void): void {
        this.slots.push(slot)
    }

    /**
     * 断开一个消息接收函数，使其不再接收消息。如果该函数不在接收列表中，则什么也不做。
     *
     * @param slot 要断开的接收函数
     */
    public disconnect(this: this, slot: (message: T) => void): void {
        const index: number = this.slots.indexOf(slot)
        if (index >= 0) {
            this.slots.splice(index, 1)
        }
    }

    public clear(this: this): void {
        this.slots = []
    }

    public isEmpty(this: this): boolean {
        return this.slots.length == 0
    }

    public emit(this:this, message: T): void {
        this.slots.slice().forEach((slot: (message: T) => void): void => {
            slot(message)
        })
    }

    /**
     * 等待消息被发送或超时。
     *
     * @param timeout 超时时间（毫秒），`0` 表示永不超时。
     * @returns 一个 Promise 对象，当收到消息时，该对象将被 resolve，如果等待超时，则该对象将被 reject。
     */
    public wait(this: this, timeout: number = 0): Promise<T> {
        return new Promise((resolve, reject) => {
            const slot: (message: T) => void = (message: T): void => {
                this.disconnect(slot)
                resolve(message)
            }
            this.connect(slot)
            if (timeout > 0) {
                setTimeout((): void => {
                    this.disconnect(slot)
                    reject(new Error("Timeout"))
                }, timeout)
            }
        })
    }
}
