import { InjectionContext } from "./injection-context"
import { Injector } from "./injector"
import { ClassDefinition } from "./class-definition"

export interface InjectionStep<T> {
    target: ClassDefinition<T>
    callstack: any[]
    context: InjectionContext
    injector: Injector
    instances: object[]
}