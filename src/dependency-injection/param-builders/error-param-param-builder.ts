import { ParamListBuilder } from "./param-list-builder"

export class ErrorParamParamBuilder implements ParamListBuilder {

    public buildParamList(target: object, methodName: string, error?: Error): any[] {
        const paramList = []
        const errorParams = Reflect.getMetadata("custom:errorparam", target)
        if (errorParams && errorParams[methodName]) {
            paramList[errorParams[methodName].index] = error
        }
        return paramList
    }

}