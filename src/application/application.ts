import { ApplicationTemplate } from "../templates/application.template";
import { CommandTemplate } from "../templates/command.template";
import { ModuleTemplate } from "../templates/module.template";

export abstract class Application extends ApplicationTemplate {

    public run(): void {
        const args = process.argv
        const command = this.findCommand(args[2])
        if (command !== undefined) {
            command["execute"](args)
        } else {
            this.logger.error("Command '" + args[2] + "' does not exist!")
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

    private findCommand(name: string): CommandTemplate {
        return this.getCommands().find((command: CommandTemplate) => {
            return command.settings.name === name
        })
    }

}