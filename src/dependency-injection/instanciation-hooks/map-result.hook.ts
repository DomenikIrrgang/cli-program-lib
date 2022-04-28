import { InjectionStep } from "../injection-step"
import { PostInstanciationHook } from "../post-instanciation-hook"
import { GenericMapper } from "../../mapping/generic.mapper"

export class MapResultHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const mapResults = Reflect.getMetadata('custom:mapresult', injectionStep.target.prototype)
        if (mapResults) {
            const mapper = injectionStep.injector.getInstance(GenericMapper)
            for (const mapResult of mapResults) {
                const oldValue = instance[mapResult.propertyKey].bind(instance)
                instance[mapResult.propertyKey] = async (...args: any[]) => mapper.convert(await oldValue(...args), mapResult.type, mapResult.mappingType)
            }
        }
        return instance
    }

}