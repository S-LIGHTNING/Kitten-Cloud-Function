import { None } from "./other"
import { Signal } from "./signal"

export type ConfigChange<T> = {
    originalValue: T,
    newValue: T
}

export class SingleConfig<T> {

    private upper: SingleConfig<T> | T

    private store: T | None

    public changed: Signal<ConfigChange<T>> = new Signal()

    public get config(): T | None {
        return this.store
    }
    public set config(value: T | None) {
        let originalValue = this.value
        this.store = value
        let newValue = this.value
        if (originalValue != value) {
            this.changed.emit({ originalValue, newValue })
        }
    }

    public get value(): T {
        if (this.store != None) {
            return this.store
        }
        if (this.upper instanceof SingleConfig) {
            return this.upper.value
        }
        return this.upper
    }
    public set value(value: T) {
        this.config = value
    }

    public constructor(upper: SingleConfig<T> | T, value: T | None) {
        this.upper = upper
        this.store = value

        if (upper instanceof SingleConfig) {
            upper.changed.connect((change: ConfigChange<T>): void => {
                if (this.store == None) {
                    this.changed.emit(change)
                }
            })
        }
    }
}
