import { ParamListGenerator } from "./param-builders/param-list-generator"
import { Injectable } from "../decorators/injectable.decorator"
import { ErrorParamParamBuilder } from "./param-builders/error-param-param-builder"

@Injectable({
    global: true,
    unique: true,
})
export class DefaultParamListGenerator extends ParamListGenerator {

    public constructor() {
        super([
            new ErrorParamParamBuilder(),
        ])
    }

}