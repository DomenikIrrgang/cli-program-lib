export interface ClassDefinition<T> {
    name: string,
    caller: any,
    length: number,
    prototype: T,
    arguments: any
    new(...args: any[]): T
}