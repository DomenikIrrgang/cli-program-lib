import "reflect-metadata"
import { Mapper } from "../mapping/mapper"
import { ClassDefinition } from "../dependency-injection/class-definition"

const metaDataKey = 'custom:mapparam'

/**
 * Provides information how the property should be mapped to the target type.
 *
 * @param settings Settings related to mapping a parameter to a different type.
 *
 */
export function Map(settings?: MapSettings) {
    return (target: any, propertyKey: string) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, [], target)
        }
        const parameters = Reflect.getMetadata(metaDataKey, target)
        parameters.push({
            source: (settings?.source) ? settings.source : propertyKey,
            name: propertyKey,
            type: settings?.type,
            convert: (settings?.convert) ? settings.convert : (mapper: Mapper, value: any, type?: ClassDefinition<any>) => (type) ? mapper.convert(value, type) : value
        })
        Reflect.defineMetadata(metaDataKey, parameters, target)
    }
}

export interface MapSettings {
    source?: string,
    type?: ClassDefinition<any>,
    convert?: (mapper: Mapper, value: any, type?: ClassDefinition<any>,) => any
}