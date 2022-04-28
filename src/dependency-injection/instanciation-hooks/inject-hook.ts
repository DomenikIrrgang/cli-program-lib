import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { mergeObject } from "../../util/functions"

export class InjectHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const injectables = Reflect.getMetadata('custom:inject', injectionStep.target.prototype)
        if (injectables) {
            for (const inject in injectables) {
                instance[inject] = injectionStep.injector.createInstance(mergeObject(injectionStep, { target: injectables[inject] }))
            }
        }
        return instance
    }

}