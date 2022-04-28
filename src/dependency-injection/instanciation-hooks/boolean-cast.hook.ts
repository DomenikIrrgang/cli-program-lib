import { TypeCastHook } from "./type-cast-hook"

export class BooleanCastHook extends TypeCastHook<boolean> {

    public constructor() {
        super('custom:boolean')
    }

    protected cast(value: any): boolean {
        return value === "true"
    }

}