import { isModule, ModuleSettings } from "../../decorators/module.decorator"
import { ModuleTemplate } from "../../templates/module.template"
import { mergeObject } from "../../util/functions"
import { ClassDefinition } from "../class-definition"
import { InjectionStep } from "../injection-step"
import { PostInstanciationHook } from "../post-instanciation-hook"

export class ModuleInjectHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        if (isModule(injectionStep.target)) {
            const moduleInstance = instance as unknown as ModuleTemplate
            const moduleSettings = Reflect.getMetadata('custom:settings', injectionStep.target) as ModuleSettings
            moduleInstance.settings = moduleSettings
            moduleInstance.commands = []
            moduleInstance.exports = []
            moduleInstance.imports = []
            moduleInstance.errorHandlers = []
            moduleSettings.providers?.forEach(provider => injectionStep.context.addInjectable(provider))
            moduleSettings.imports?.forEach(module => moduleInstance.imports.push(injectionStep.injector.createInstance(mergeObject(injectionStep, { target: module }))))
            moduleSettings.exports?.forEach(module => moduleInstance.exports.push(injectionStep.injector.createInstance(mergeObject(injectionStep, { target: module }))))
            moduleSettings.errorHandlers?.forEach(errorHandler => moduleInstance.errorHandlers.push(injectionStep.injector.createInstance(mergeObject(injectionStep, { target: errorHandler }))))
            moduleSettings.initializer?.forEach(initializer => this.runInitializer(injectionStep, initializer))
            moduleSettings.commands?.forEach(command => moduleInstance.commands.push(injectionStep.injector.createInstance(mergeObject(injectionStep, { target: command }))))
            return moduleInstance as unknown as T
        }
        return instance
    }

    private runInitializer<T>(injectionStep: InjectionStep<T>, initializer: { callback: (... params: any[]) => void, dependencies: ClassDefinition<any>[] }): void {
        const parameterList = []
        for (const dependency of initializer.dependencies) {
            parameterList.push(injectionStep.injector.getInstance(dependency, injectionStep.context))
        }
        initializer.callback(...parameterList)
    }

}