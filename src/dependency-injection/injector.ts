import { getInjectionSettings, isInjectable } from '../decorators/injectable.decorator'
import { mergeObject } from '../util/functions'
import { ClassDefinition } from './class-definition'
import { InjectionContext } from './injection-context'
import { InjectionStep } from './injection-step'
import { BooleanCastHook } from './instanciation-hooks/boolean-cast.hook'
import { CastHook } from './instanciation-hooks/cast-inject.hook'
import { CommandHook } from './instanciation-hooks/command.hook'
import { ConfigHook } from './instanciation-hooks/config.hook'
import { EnvironmentHook } from './instanciation-hooks/environment-hook'
import { ErrorHandlerInjectHook } from './instanciation-hooks/error-handler-inject.hook'
import { InjectHook } from './instanciation-hooks/inject-hook'
import { JsonHook } from './instanciation-hooks/json-hook'
import { MapResultHook } from './instanciation-hooks/map-result.hook'
import { ModuleInjectHook } from './instanciation-hooks/module-inject.hook'
import { ModuleInjectionContextHook } from './instanciation-hooks/module-injection-context.hook'
import { NumberCastHook } from './instanciation-hooks/number-cast.hook'
import { ParamHook } from './instanciation-hooks/param.hook'
import { PostInstanciationHook } from './post-instanciation-hook'
import { PreInstanciationHook } from './pre-instanciation-hook'

export class Injector {

    public static UNIQUE_INSTANCES: object[] = []

    protected preInstanciationHooks: PreInstanciationHook[] = [
        new ModuleInjectionContextHook(),
        new ParamHook()
    ]

    protected postInstanciationHooks: PostInstanciationHook[] = [
        new EnvironmentHook(),
        new ConfigHook(),
        new JsonHook(),
        new CastHook(),
        new InjectHook(),
        new NumberCastHook(),
        new BooleanCastHook(),
        new MapResultHook(),
        new ErrorHandlerInjectHook(),
        new ModuleInjectHook(),
        new CommandHook(),
    ]

    public getInstance<T>(target: ClassDefinition<T>, injectionContext?: InjectionContext): T {
        return this.createInstance({
            target,
            callstack: [],
            context: (injectionContext) ? injectionContext : new InjectionContext().addInjectable(target),
            injector: this,
            instances: []
        })
    }

    public createInstanceWithTarget<T>(target: ClassDefinition<T>, injectionStep: InjectionStep<T>): T {
        injectionStep.context.addInjectable(target)
        return this.createInstance(mergeObject(injectionStep, { target }))
    }

    public createInstance<T>(injectionStep: InjectionStep<T>): any {
        this.assertIsInjectable(injectionStep.target)
        this.assertIsInInjectionContext(injectionStep)
        this.assertNonCircularDependency(injectionStep)

        if (!this.instanceExists(injectionStep)) {
            injectionStep.callstack.push(injectionStep.target)
            let params = []
            this.preInstanciationHooks.forEach(preInstanciationHook => params = preInstanciationHook.hook(injectionStep, params))
            this.saveInstance(new injectionStep.target(...params), injectionStep)
            this.postInstanciationHooks.forEach(postInstanciationHook => this.saveInstance(postInstanciationHook.hook(injectionStep), injectionStep))
            injectionStep.callstack.pop()
        }
        return this.findInstance(injectionStep)
    }

    public instanceExists<T>(injectionStep: InjectionStep<T>): boolean {
        const injectionSettings = getInjectionSettings(injectionStep.target)
        return (injectionSettings.unique && Injector.UNIQUE_INSTANCES[injectionStep.target.name] !== undefined) || (injectionSettings.unique === false && injectionStep.instances[injectionStep.target.name])
    }

    public saveInstance<T>(instance: T, injectionStep: InjectionStep<T>): void {
        const injectionSettings = getInjectionSettings(injectionStep.target)
        if (injectionSettings.unique) {
            Injector.UNIQUE_INSTANCES[injectionStep.target.name] = instance
        } else {
            injectionStep.instances[injectionStep.target.name] = instance
        }
    }

    public findInstance<T>(injectionStep: InjectionStep<T>): T {
        const injectionSettings = getInjectionSettings(injectionStep.target)
        return (injectionSettings.unique) ? Injector.UNIQUE_INSTANCES[injectionStep.target.name] : injectionStep.instances[injectionStep.target.name]
    }

    private assertIsInjectable(target: any): void {
        if (!isInjectable(target)) {
            throw new Error(`${target} is not an injectable object!`)
        }
    }

    private assertIsInInjectionContext<T>(injectionStep: InjectionStep<T>): void {
        if (injectionStep.context.getInjectables().find(value => value === injectionStep.target) === undefined && getInjectionSettings(injectionStep.target).global !== true) {
            throw new Error(`'${injectionStep.target.name}' is not in the injection context! Cannot instanciate object.`)
        }
    }

    private assertNonCircularDependency<T>(injectionStep: InjectionStep<T>): void {
        if (injectionStep.callstack.find(value => value === injectionStep.target)) {
            throw new Error(`Circular dependency of '${injectionStep.target.name}' detected. Cannot instanciate object.`)
        }
    }
}

export const injector = new Injector()