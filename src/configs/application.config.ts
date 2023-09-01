import { Injectable } from "../decorators/injectable.decorator"
import { Environment } from "../decorators/environment.decorator"
import { Config } from "../decorators/config.decorator"
import { Boolean } from "../decorators/boolean.decorator"
import { LogLevel } from "../logging/log-level"
import { Cast } from "../decorators/cast.decorator"

@Injectable({
    global: true,
    unique: true
})
export class ApplicationConfig {

    @Environment("APPLICATION_NAME")
    @Config("application.name", "cli-program-lib")
    public name: string

    @Environment("APPLICATION_LOGGING_ENABLED")
    @Config("application.logging.enabled")
    @Boolean(true)
    public loggingEnabled: boolean

    @Environment("APPLICATION_LOGGING_LEVEL")
    @Config("application.logging.level", "DEBUG")
    @Cast((value: string) => {
        if (LogLevel[value]) {
            return LogLevel[value]
        } else {
            throw Error(`Unknown LogLevel: ${value}`)
        }
    })
    public loggingLevel: LogLevel

    @Environment("APPLICATION_PROFILE", "application")
    public profile: string

}