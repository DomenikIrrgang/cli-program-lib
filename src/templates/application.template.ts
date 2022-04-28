import { ApplicationConfig } from '../configs/application.config'
import { AppSettings } from '../decorators/app.decorator'
import { DefaultParamListGenerator } from '../dependency-injection/default-param-list-generator'
import { injector } from '../dependency-injection/injector'
import { ParamListGenerator } from '../dependency-injection/param-builders/param-list-generator'
import { LogLevel } from '../logging/log-level'
import { Logger } from '../logging/logger'
import { ModuleTemplate } from './module.template'

export abstract class ApplicationTemplate {

    protected libraries: any[]
    protected profile: string
    protected logger: Logger
    protected config: ApplicationConfig
    protected rootModule: ModuleTemplate
    protected paramListGenerator: ParamListGenerator
    protected readonly version = "0.0.1"

    constructor() {
        this.logger = injector.getInstance(Logger)
        this.config = injector.getInstance(ApplicationConfig)
        this.paramListGenerator = injector.getInstance(DefaultParamListGenerator)
        this.printApplicationInfo()
        this.initApplication()
    }

    public getSettings(): AppSettings {
        return Reflect.getMetadata('custom:settings', ApplicationTemplate)
    }

    private initApplication(): void {
        this.rootModule = injector.getInstance(this.getSettings().bootstrap)
    }

    private printApplicationInfo(): void {
        this.logger.info("application.name:", this.config.name)
        this.logger.info("application.profile", this.config.profile)
        this.logger.info("application.version", this.version)
        this.logger.info("application.config.repository", this.config.repository)
        this.logger.info("application.config.version", this.config.version)
        this.logger.info("application.logging.enabled:", this.config.loggingEnabled)
        this.logger.info("application.logging.level:", LogLevel[this.config.loggingLevel])
    }

}