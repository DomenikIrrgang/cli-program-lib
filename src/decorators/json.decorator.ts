import "reflect-metadata"
import { getParameterNames } from "../util/functions"

const metaDataKey = 'custom:json'

/**
 * Marks an instancevariable to be injected a certain json file contents. Values are only availble after the constructor call has finished.
 *
 * @param name Name of the environmentvariable whhose value shall be injected.
 * @param defaultValue Defaultvalue that will be injected in the case that the environmentvariable is not set.
 */
export function Json(jsonOptions: JsonOptions) {
    return (target: any, propertyKey: string) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, {}, target)
        }
        const jsons = Reflect.getMetadata(metaDataKey, target)
        jsons[propertyKey] = {
            jsonOptions: jsonOptions
        }
        Reflect.defineMetadata(metaDataKey, jsons, target)
    }
}

export interface JsonOptions {
    filePath: string
    jsonPath?: string
    default?: any
}