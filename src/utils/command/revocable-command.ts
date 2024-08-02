import { Command } from "./command"

export interface RevocableCommand extends Command {
    revoke(this: this): void
}
