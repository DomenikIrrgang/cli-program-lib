import { Injectable } from "../decorators/injectable.decorator"
import { Mapper } from "./mapper"
import { MappingType } from "./mapping-type"

@Injectable({
    global: true
})
export class GenericMapper implements Mapper {

    public convert<T>(source: any, target: new () => T, type: MappingType = MappingType.SINGLE): T | T[] {
        switch(type) {
            case MappingType.SINGLE: {
                const result = new target()
                const parameters = Reflect.getMetadata('custom:mapparam', target.prototype)
                for (const parameter of parameters) {
                    result[parameter.name] = parameter.convert(this, source[parameter.source], parameter.type)
                }
                return result
            }
            case MappingType.ARRAY: {
                const results = []
                for (const item of source) {
                    const result = new target()
                    const parameters = Reflect.getMetadata('custom:mapparam', target.prototype)
                    for (const parameter of parameters) {
                        result[parameter.name] = parameter.convert(this, item[parameter.source], parameter.type)
                    }
                    results.push(result)
                }
                return results
            }
        }
    }

}