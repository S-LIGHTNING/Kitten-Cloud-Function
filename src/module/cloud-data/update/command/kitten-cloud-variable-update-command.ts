import { KittenCloudVariable } from "../../kitten-cloud-variable"
import { KittenCloudDataUpdateSource } from "../kitten-cloud-data-update-source"
import { KittenCloudDataUpdateCommand } from "./kitten-cloud-data-update-command"

export abstract class KittenCloudVariableUpdateCommand extends KittenCloudDataUpdateCommand {
    public constructor(
        source: KittenCloudDataUpdateSource,
        public variable: KittenCloudVariable
    ) {
        super(source, variable)
    }
}
