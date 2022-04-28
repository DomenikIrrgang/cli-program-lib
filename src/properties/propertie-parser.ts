import { Injectable } from "../decorators/injectable.decorator"
import { Environment } from "../decorators/environment.decorator"
import { readFileSync, existsSync } from "fs"

@Injectable()
export class PropertyParser {

    @Environment("APPLICATION_PROFILE", "application")
    private profile: string

    public parseFileToObject(path: string): object {
        const tmp = {}
        if (existsSync(path) === true) {
            const data = readFileSync(path).toString().split(/(?:\r\n|\r|\n)/g)
            for (const line of data) {
                const splitPosition = line.indexOf("=")
                const key = line.substring(0, splitPosition)
                const value = line.substring(splitPosition + 1, line.length)
                this.setValue(tmp, key.split(".").reverse(), value)
            }
        }
        return tmp
    }

    public parseFileToMap(path: string): object {
        const tmp = {}
        if (existsSync(path) === true) {
            const data = readFileSync(path).toString().split(/(?:\r\n|\r|\n)/g)
            for (const line of data) {
                const splitPosition = line.indexOf("=")
                const key = line.substring(0, splitPosition)
                const value = line.substring(splitPosition + 1, line.length)
                tmp[key] = value
            }
        }
        return tmp
    }

    private setValue(object: object, keys: string[], value): object {
        const key = keys.pop()
        if (keys.length !== 0) {
            if (object[key] === undefined) {
                object[key] = {}
            }
            return this.setValue(object[key], keys, value)
        } else {
            object[key] = value
            return object
        }
    }

    public getProfileConfigPath(): string {
        return this.profile + ".properties"
    }
}