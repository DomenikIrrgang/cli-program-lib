import { Injectable } from "../decorators/injectable.decorator"
import { readFileSync, existsSync } from "fs"

@Injectable()
export class JsonParser {

    public parseFileToObject(path: string): object {
        const tmp = {}
        if (existsSync(path) === true) {
            const data = readFileSync(path).toString().split(/(?:\r\n|\r|\n)/g)
            return JSON.parse(data.join(""))
        }
        return undefined
    }

    public getProfileConfigPath(): string {
        return process.argv[1].replace("dist/index.js", "") + "wowlua.json"
    }

}