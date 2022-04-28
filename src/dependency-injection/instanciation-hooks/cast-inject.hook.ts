import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"

export class CastHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const casts = Reflect.getMetadata('custom:cast', injectionStep.target.prototype)
        if (casts) {
            for (const cast in casts) {
                instance[cast] = casts[cast].callback(instance[cast])
            }
        }
        return instance
    }

}