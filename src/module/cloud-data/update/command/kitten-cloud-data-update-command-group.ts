import { RevocableCommandGroup } from "../../../../utils/command/revocable-command-group"
import { None } from "../../../../utils/other"
import { KittenCloudDataUpdateCommand } from "./kitten-cloud-data-update-command"

export class KittenCloudDataUpdateCommandGroup
    extends RevocableCommandGroup<KittenCloudDataUpdateCommand> {

    public removeFrontIneffective(this: this): void {
        let firstCommand: KittenCloudDataUpdateCommand | None
        while ((firstCommand = this.first()) != None) {
            if (firstCommand.isEffective()) {
                break
            } else {
                this.shift()
            }
        }
    }

    public removeBackIneffective(this: this): void {
        let lastCommand: KittenCloudDataUpdateCommand | None
        while ((lastCommand = this.last()) != None) {
            if (lastCommand.isEffective()) {
                break
            } else {
                this.pop()
            }
        }
    }

    public toCloudJSON(this: this): object[] {
        const result: object[] = []
        for (const command of this.commandArray) {
            if (command.isLegal()) {
                result.push(command.toCloudJSON())
            }
        }
        return result
    }

    public toCloudString(this: this): string {
        return JSON.stringify(this.toCloudJSON())
    }
}
