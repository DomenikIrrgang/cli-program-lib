export interface Mapper {
    convert<T>(source: object, target: new () => T): T | T[]
}