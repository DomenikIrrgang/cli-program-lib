import { PostInstanciationHook } from "../post-instanciation-hook"
import { InjectionStep } from "../injection-step"
import { variableDefaultValue, mergeObject } from "../../util/functions"
import { InjectionContext } from "../injection-context"
import { JsonParser } from "../../properties/json.parser"
import { JSONPath } from "jsonpath-plus"

export class JsonHook implements PostInstanciationHook {

    public hook<T>(injectionStep: InjectionStep<T>): T {
        const instance = injectionStep.injector.findInstance(injectionStep)
        const jsons = Reflect.getMetadata('custom:json', injectionStep.target.prototype)
        if (jsons) {
            const jsonParser: JsonParser = injectionStep.injector.createInstance(mergeObject(injectionStep, {
                target: JsonParser,
                context: new InjectionContext([JsonParser])
            }))
            for (const json in jsons) {
                const jsonOptions = jsons[json].jsonOptions
                const jsonObject = jsonParser.parseFileToObject(jsonOptions.filePath)
                if (jsonObject !== undefined){
                    let value = JSONPath({ path: jsonOptions.jsonPath, json: jsonObject })[0]
                    instance[json] = variableDefaultValue(value, jsonOptions.default)
                } else {
                    instance[json] = jsonOptions.default
                }
            }
        }
        return instance
    }

}