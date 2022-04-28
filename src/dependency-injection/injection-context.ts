import { isInjectable } from '../decorators/injectable.decorator'
import { ClassDefinition } from './class-definition'

export class InjectionContext {

    public constructor(private injectables: ClassDefinition<any>[] = []) { }

    public addInjectable(injectable: ClassDefinition<any>): InjectionContext {
        if (isInjectable(injectable)) {
            this.injectables.push(injectable)
        } else {
            throw Error('Cannot add a non injectable object to the injectable registry.')
        }
        return this
    }

    public getInjectables(): any[] {
        return this.injectables
    }

    public merge(injectionContext: InjectionContext): InjectionContext {
        return new InjectionContext(this.injectables.concat(injectionContext.injectables))
    }

}