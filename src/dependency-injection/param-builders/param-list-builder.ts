export interface ParamListBuilder {
    buildParamList(target: object, methodName: string, error?: Error): any[]
}