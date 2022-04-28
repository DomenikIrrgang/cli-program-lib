import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"

export abstract class TypeCastHook<K> implements PostInstanciationHook {

    constructor(private metadataKey: string) { }

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        if (Reflect.getMetadata(this.metadataKey, injectionStep.target.prototype)) {
            const variables = Reflect.getMetadata(this.metadataKey, injectionStep.target.prototype)
            for (const variable in variables) {
                if (instance[variable] !== undefined) {
                    instance[variable] = this.cast(instance[variable])
                } else {
                    instance[variable] = variables[variable].default
                }
            }
        }
        return instance
    }

    protected abstract cast(value: any): K

}