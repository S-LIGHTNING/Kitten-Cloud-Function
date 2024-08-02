import { KittenCloudVariableSetCommand } from "./kitten-cloud-variable-set-command"

export class KittenCloudPublicVariableSetCommand extends KittenCloudVariableSetCommand {
    public toCloudJSON(this: this): object {
        return {
            action: "set",
            cvid: this.variable.cvid,
            value: this.value,
            param_type: typeof this.value
        }
    }
}
