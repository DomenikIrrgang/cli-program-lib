import { InjectionStep } from "./injection-step"

export interface PostInstanciationHook {
    hook<T>(injectionStep: InjectionStep<T>): T
}