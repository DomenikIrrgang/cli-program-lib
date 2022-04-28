import { TypeCastHook } from "./type-cast-hook"

export class NumberCastHook extends TypeCastHook<number> {

    public constructor() {
        super('custom:number')
    }

    protected cast(value: any): number {
        return +value
    }

}