import { Command } from "./command"

export interface MergableCommand extends Command {
    merge(this: this, that: this): void
}
