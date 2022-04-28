import { PreInstanciationHook } from "../pre-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { ModuleSettings, isModule } from "../../decorators/module.decorator"
import { mergeObject } from "../../util/functions"
import { ModuleTemplate } from "../../templates/module.template"

export class ModuleInjectionContextHook implements PreInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>, params: any[]): any[] {
        if (isModule(injectionStep.target)) {
            const moduleSettings = Reflect.getMetadata('custom:settings', injectionStep.target) as ModuleSettings
            const subModules = moduleSettings.imports?.map(subModule => injectionStep.injector.createInstanceWithTarget(subModule, injectionStep) as unknown as ModuleTemplate)
            const context = [moduleSettings.commands, moduleSettings.imports, moduleSettings.errorHandlers]
            subModules?.forEach(subModule => {
                context.push(subModule.settings.commands)
                subModule.exports.forEach(exportedModule => injectionStep.context = injectionStep.context.merge(exportedModule.settings.injectionContext))
            })
            context.forEach(type => type?.forEach(target => injectionStep.context.addInjectable(target)))
            Reflect.defineMetadata('custom:settings', mergeObject(moduleSettings, { injectionContext: injectionStep.context }), injectionStep.target)
        }
        return params
    }

}