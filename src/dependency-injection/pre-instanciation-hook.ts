import { InjectionStep } from "./injection-step"

export interface PreInstanciationHook {
    hook<T>(injectionStep: InjectionStep<T>, params: any[]): any[]
}