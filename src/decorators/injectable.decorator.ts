import 'reflect-metadata'
import { mergeObject } from '../util/functions'

export function Injectable(settings?: InjectionSettings) {
    return (target: any) => {
        makeInjectable(target, settings)
    }
}

export function makeInjectable(target: any, settings?: InjectionSettings): void {
    Reflect.defineMetadata('custom:injectable', (settings) ? mergeObject(defaultInjectionSettings, settings) : defaultInjectionSettings, target)
}

export function isInjectable(object: any): boolean {
    return Reflect.getMetadata('custom:injectable', object) !== undefined
}

export function getInjectionSettings(object): InjectionSettings {
    return Reflect.getMetadata('custom:injectable', object)
}

export interface InjectionSettings {
    global?: boolean
    unique?: boolean
}

const defaultInjectionSettings: InjectionSettings = {
    global: false,
    unique: false
}