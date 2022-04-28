import "reflect-metadata"
import { MappingType } from "../mapping/mapping-type"

const metaDataKey = 'custom:mapresult'

/**
 * Marks a function to be mounted as an endpoint for GET requests.
 *
 * @param path Path under which the endpoint will be mounted. (ControllerPath + "/" + path)
 */
export function MapResult<T>(type: new () => T, mappingType?: MappingType) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, [], target)
        }
        const functions = Reflect.getMetadata(metaDataKey, target)
        functions.push({
            type,
            propertyKey,
            descriptor,
            mappingType
        })
        Reflect.defineMetadata(metaDataKey, functions, target)
    }
}