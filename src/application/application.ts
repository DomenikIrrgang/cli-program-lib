import { ApplicationTemplate } from "../templates/application.template";
import { CommandTemplate } from "../templates/command.template";
import { ModuleTemplate } from "../templates/module.template";

export abstract class Application extends ApplicationTemplate {

    public run(): void {
        const args = process.argv
        for (let command of this.getCommands()) {
            this.logger.debug(command.settings.name)
            if (command.settings.name === args[2]) {
                command["execute"](args)
            }
        }
    }

    private getCommands(): CommandTemplate[] {
        return this.searchCommandsInModule(this.rootModule)
    }

    private searchCommandsInModule(module: ModuleTemplate): CommandTemplate[] {
        let commands = module.commands
        for (module of module.imports) {
            let moduleCommands = this.searchCommandsInModule(module)
            commands = commands.concat(moduleCommands)
        }
        return commands
    }

}