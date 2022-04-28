import "reflect-metadata"

const metaDataKey = 'custom:inject'

/**
 * Marks an instancevariable to be injected a @Injectable class. Values are only available once the constructor call has finished.
 *
 * @param definition Class that shall be injected. (Needs to be marked with the @Injectable annotation)
 *
 */
export function Inject(definition) {
    return (target: any, propertyKey: string) => {
        if (Reflect.getMetadata(metaDataKey, target) === undefined) {
            Reflect.defineMetadata(metaDataKey, {}, target)
        }
        const environments = Reflect.getMetadata(metaDataKey, target)
        environments[propertyKey] = definition
        Reflect.defineMetadata(metaDataKey, environments, target)
    }
}