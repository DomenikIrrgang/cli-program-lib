import { makeInjectable } from './injectable.decorator'
import { InjectionContext } from '../dependency-injection/injection-context'
import { ClassDefinition } from "../dependency-injection/class-definition"

export function Module(settings: ModuleSettings) {
  return (target: any) => {
    makeInjectable(target, { unique: true })
    Reflect.defineMetadata('custom:type', 'module', target)
    Reflect.defineMetadata('custom:settings', settings, target)
  }
}

export function isModule(object: any): boolean {
  return Reflect.getMetadata('custom:type', object) === 'module'
}

export interface ModuleSettings {
  commands?: ClassDefinition<any>[]
  errorHandlers?: ClassDefinition<any>[]
  imports?: ClassDefinition<any>[]
  exports?: ClassDefinition<any>[]
  initializer?: { callback: (... params: any[]) => void, dependencies: ClassDefinition<any>[] }[],
  providers: ClassDefinition<any>[],
  injectionContext?: InjectionContext
}
