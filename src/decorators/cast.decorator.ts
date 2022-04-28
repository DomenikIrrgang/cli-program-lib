import "reflect-metadata"
import { getParameterNames } from "../util/functions"

const metaDataKey = 'custom:cast'

/**
 * Marks an instancevariable to be casted by a function that needs to return the appropiate type. Values are only availble after the constructor call has finished.
 *
 * @param callback Function that converts the string into the desired type.
 */
export function Cast(callback: (value: string) => any) {
    return (target: any, propertyKey: string) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, {}, target)
        }
        const casts = Reflect.getMetadata(metaDataKey, target)
        casts[propertyKey] = {
            callback
        }
        Reflect.defineMetadata(metaDataKey, casts, target)
    }
}