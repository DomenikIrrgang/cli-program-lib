import { ClassDefinition } from "../dependency-injection/class-definition"

export function App(settings: AppSettings) {
    return (target: any) => {
        Reflect.defineMetadata('custom:type', 'app', target)
        Reflect.defineMetadata('custom:settings', settings, target.__proto__.__proto__)
    }
}

export function isApp(object: any): boolean {
    return Reflect.getMetadata('custom:type', object) === 'app'
}

export interface AppSettings {
    bootstrap: ClassDefinition<any>
}
