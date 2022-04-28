import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { isErrorHandler, ErrorHandlerSettings } from "../../decorators/error-handler.decorator"
import { ErrorHandlerTemplate } from "../../templates/error-handler.template"

export class ErrorHandlerInjectHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        if (isErrorHandler(injectionStep.target)) {
            const errorHandler = instance as unknown as ErrorHandlerTemplate
            const errorHandlerSettings = Reflect.getMetadata('custom:settings', injectionStep.target) as ErrorHandlerSettings
            errorHandler.settings = errorHandlerSettings
            if (errorHandler[errorHandlerSettings.functionName] === undefined) {
                throw Error(`Could not instantiate ErrorHandler, function with name ${errorHandlerSettings.functionName} is not defined!`)
            }
            return errorHandler as unknown as T
        }
        return instance
    }

}