import "reflect-metadata"

export function ErrorParam(target: object, propertyName: string | symbol, index: number) {
    if (Reflect.getMetadata('custom:errorparam', target) === undefined) {
        Reflect.defineMetadata('custom:errorparam', {}, target)
    }
    const errorParams = Reflect.getMetadata('custom:errorparam', target)
    errorParams[propertyName] = {
        index
    }
    Reflect.defineMetadata('custom:errorparam', errorParams, target)
}
