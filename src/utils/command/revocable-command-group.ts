import { CommandGroup } from "./command-group"
import { RevocableCommand } from "./revocable-command"

export class RevocableCommandGroup<COMMAND_TYPE extends RevocableCommand = RevocableCommand>
    extends CommandGroup<COMMAND_TYPE> implements RevocableCommand {
    public revoke(this: this): void {
        for (let i: number = this.commandArray.length - 1; i >= 0; i--) {
            this.commandArray[i]?.revoke()
        }
    }
}
