import { KittenCloudVariableSetCommand } from "./kitten-cloud-variable-set-command"

export class KittenCloudPrivateVariableSetCommand extends KittenCloudVariableSetCommand {
    public override toCloudJSON(): object {
        return {
            cvid: this.variable.cvid,
            value: this.value,
            param_type: typeof this.value
        }
    }
}
