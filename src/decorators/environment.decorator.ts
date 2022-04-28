import "reflect-metadata"
import { getParameterNames } from "../util/functions"

const metaDataKey = 'custom:environment'

/**
 * Marks an instancevariable to be injected a certain environmentvariable. Values are only availble after the constructor call has finished.
 *
 * @param name Name of the environmentvariable whhose value shall be injected.
 * @param defaultValue Defaultvalue that will be injected in the case that the environmentvariable is not set.
 */
export function Environment(name: string, defaultValue?: any) {
    return (target: any, propertyKey: string) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, {}, target)
        }
        const environments = Reflect.getMetadata(metaDataKey, target)
        environments[propertyKey] = {
            name,
            default: defaultValue
        }
        Reflect.defineMetadata(metaDataKey, environments, target)
    }
}