import { Injectable } from "../decorators/injectable.decorator"
import { readFileSync, existsSync } from "fs"

@Injectable()
export class JsonParser {

    public parseFileToObject(path: string): object {
        if (existsSync(process.cwd() + "/" + path) === true) {
            const data = readFileSync(path).toString().split(/(?:\r\n|\r|\n)/g)
            return JSON.parse(data.join(""))
        }
        return undefined
    }

}