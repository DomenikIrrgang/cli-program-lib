import { PreInstanciationHook } from "../pre-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { isInjectable } from "../../decorators/injectable.decorator"
import { mergeObject } from "../../util/functions"

export class ParamHook implements PreInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>, params: any[]): any[] {
        const paramList = Reflect.getMetadata('design:paramtypes', injectionStep.target)
        if (paramList) {
            for (const param of paramList) {
                if (isInjectable(param)) {
                    params.push(injectionStep.injector.createInstance(mergeObject(injectionStep, { target: param })))
                } else {
                    params.push(undefined)
                }
            }
        }
        return params
    }

}