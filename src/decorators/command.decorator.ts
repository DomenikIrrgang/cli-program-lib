import { makeInjectable } from './injectable.decorator'
import { ClassDefinition } from "../dependency-injection/class-definition"

export function Command(settings: CommandSettings) {
    return (target: any) => {
        makeInjectable(target, { unique: true })
        Reflect.defineMetadata('custom:type', 'command', target)
        Reflect.defineMetadata('custom:settings', settings, target)
    }
}

export function isCommand(object: any): boolean {
    return Reflect.getMetadata('custom:type', object) === 'command'
}

export interface CommandSettings {
    name: string
    errorHandlers?: ClassDefinition<any>[]
}
