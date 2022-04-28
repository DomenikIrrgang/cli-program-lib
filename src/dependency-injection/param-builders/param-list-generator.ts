import { ParamListBuilder } from "./param-list-builder"
import { mergeArrays } from "../../util/functions"

export class ParamListGenerator {

    public constructor(private paramListBuilders: ParamListBuilder[]) { }

    public getParamList(target: object, methodName: string, error?: Error): any[] {
        let paramList = []
        for (const paramListBuilder of this.paramListBuilders) {
            paramList = mergeArrays(paramList, paramListBuilder.buildParamList(target, methodName, error))
        }
        return paramList
    }

}
