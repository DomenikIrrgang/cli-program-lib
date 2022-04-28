import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { getEnvironmentVariable } from "../../util/functions"

export class EnvironmentHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const environments = Reflect.getMetadata('custom:environment', injectionStep.target.prototype)
        if (environments) {
            for (const variableName in environments) {
                if (environments[variableName] && (environments[variableName].name || (instance[variableName] === undefined && environments[variableName].default))) {
                    instance[variableName] = getEnvironmentVariable(environments[variableName].name, environments[variableName].default)
                }
            }
        }
        return instance
    }

}
