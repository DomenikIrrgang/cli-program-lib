const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const DEFAULT_PARAMS = /=[^,]+/mg
const FAT_ARROWS = /=>.*$/mg

export function getParameterNames(fn) {
    const code = fn.toString()
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '')

    const result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
        .match(/([^\s,]+)/g)

    return result === null
        ? []
        : result
}

export function randomInteger(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
}

export function mergeArrays(...arrays: any[][]): any[] {
    let tmp = []
    for (const array of arrays) {
        tmp = mergeArray(tmp, array)
    }
    return tmp
}

export function mergeArray(source: any[], destination: any[]): any[] {
    for (const key in source) {
        if (source[key]) {
            destination[key] = source[key]
        }
    }
    return destination
}

export function concatArrays(...arrays: any[][]): any[]{
    let tmp = []
    for (const array of arrays) {
        tmp = concatArray(tmp, array)
    }
    return tmp
}

export function concatArray(array1: any[], array2: any[]): any[] {
    const tmp = [...array1]
    for (const object of array2) {
        tmp.push(object)
    }
    return tmp
}

export function variableDefaultValue(newValue, defaultValue: any) {
    if (newValue === undefined || newValue === null) {
        return defaultValue
    } else {
        return newValue
    }
}

export function getEnvironmentVariable(name, defaultValue) {
    return variableDefaultValue(process.env[name], defaultValue)
}

export function mergeObject<T>(target: T, source: object): T {
    return Object.assign(Object.assign({}, target), source)
}

export interface ErrorObject {
    message: any
    statusCode: number
}

export function createErrorCallback(reject: (error: ErrorObject) => void, statusCode?: number, message?: any): any {
    return (error: any) => {
        reject({
            message: variableDefaultValue(message, error),
            statusCode
        })
    }
}