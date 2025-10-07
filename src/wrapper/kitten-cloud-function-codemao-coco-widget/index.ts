import { addCheck, addThisForMethods, exportWidget } from "slightning-coco-widget"

import { KittenCloudFunctionWidget } from "./widget"
import { types } from "./types"

exportWidget(types, KittenCloudFunctionWidget, {
    decorators: [
        addThisForMethods,
        addCheck
    ]
})
