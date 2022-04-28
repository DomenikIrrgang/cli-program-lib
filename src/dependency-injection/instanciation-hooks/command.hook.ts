import { CommandSettings, isCommand } from "../../decorators/command.decorator"
import { CommandTemplate } from "../../templates/command.template"
import { InjectionStep } from "../injection-step"
import { PostInstanciationHook } from "../post-instanciation-hook"

export class CommandHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        if (isCommand(injectionStep.target)) {
            const commandInstance = instance as unknown as CommandTemplate
            const commandSettings = Reflect.getMetadata('custom:settings', injectionStep.target) as CommandSettings
            commandInstance.settings = commandSettings
        }
        return instance
    }

}