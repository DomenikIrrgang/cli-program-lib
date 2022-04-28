import "reflect-metadata"
import { makeInjectable } from "./injectable.decorator"
import { ClassDefinition } from "../dependency-injection/class-definition"

const metaDataKey = 'custom:errorhandler'

/**
 *  Marks a class to handle errors the application throws.
 *
 * @param errors Errors the function should handle
 *
 */
export function ErrorHandler(settings: ErrorHandlerSettings) {
    return (target: any) => {
        makeInjectable(target)
        settings.functionName = settings.functionName || "onError"
        Reflect.defineMetadata('custom:type', 'errorhandler', target)
        Reflect.defineMetadata('custom:settings', settings, target)
    }
}

export interface ErrorHandlerSettings {
    errors: ClassDefinition<Error>[]
    functionName?: string
}

export function isErrorHandler(target: any) {
    return Reflect.getMetadata('custom:type', target) === "errorhandler"
}