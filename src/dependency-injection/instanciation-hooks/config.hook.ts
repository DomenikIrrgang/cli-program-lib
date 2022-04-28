import { PostInstanciationHook } from "../post-instanciation-hook"
import { PropertyParser } from "../../properties/propertie-parser"
import { InjectionStep } from "../injection-step"
import { variableDefaultValue, mergeObject } from "../../util/functions"
import { InjectionContext } from "../injection-context"

export class ConfigHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const configs = Reflect.getMetadata('custom:config', injectionStep.target.prototype)
        if (configs) {
            const propertyParser: PropertyParser = injectionStep.injector.createInstance(mergeObject(injectionStep, {
                target: PropertyParser,
                context: new InjectionContext([PropertyParser])
            }))
            const configMap = propertyParser.parseFileToMap(propertyParser.getProfileConfigPath())
            for (const config in configs) {
                if (configMap[configs[config].key] !== undefined || (instance[config] === undefined && configs[config].default !== undefined)) {
                    instance[config] = variableDefaultValue(configMap[configs[config].key], configs[config].default)
                }
            }
        }
        return instance
    }

}