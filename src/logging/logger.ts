import { Injectable } from "../decorators/injectable.decorator"
import { Inject } from "../decorators/inject.decorator"
import { LogLevel } from "./log-level"
import { ApplicationConfig } from "../configs/application.config"

@Injectable({
    global: true
})
export class Logger {

    @Inject(ApplicationConfig)
    private applicationConfig: ApplicationConfig

    public log(logLevel: LogLevel, ...message: any): void {
        if (this.applicationConfig.loggingEnabled === true) {
            if (logLevel >= this.applicationConfig.loggingLevel) {
                if (logLevel === LogLevel.DEBUG) {
                    console.log(this.getDebugLoggingMessage(logLevel), ...message)
                } else if (logLevel === LogLevel.ERROR) {
                    console.error(this.getLoggingMessage(logLevel), ...message)
                } else {
                    console.log(this.getLoggingMessage(logLevel), ...message)
                }
            }
        }
    }

    private getLoggingMessage(logLevel: LogLevel): string {
        return `${new Date(Date.now()).toUTCString()} ${this.applicationConfig.name} ${LogLevel[logLevel]}:`
    }

    private getDebugLoggingMessage(logLevel: LogLevel): string {
        return `${new Date(Date.now()).toUTCString()} ${this.applicationConfig.name} "<annonymous>"} ${LogLevel[logLevel]}:`
    }

    public debug(...message: any): void {
        this.log(LogLevel.DEBUG, ...message)
    }

    public info(...message: any): void {
        this.log(LogLevel.INFO, ...message)
    }

    public error(...message: any): void {
        this.log(LogLevel.ERROR, ...message)
    }

    public warning(...message: any): void {
        this.log(LogLevel.WARNING, ...message)
    }

}