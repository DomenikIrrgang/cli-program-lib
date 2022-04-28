import { ModuleSettings } from '../decorators/module.decorator'
import { CommandTemplate } from './command.template'
import { ErrorHandlerTemplate } from './error-handler.template'

export class ModuleTemplate {
  public settings: ModuleSettings
  public commands: CommandTemplate[] = []
  public errorHandlers: ErrorHandlerTemplate[] = []
  public imports: ModuleTemplate[] = []
  public exports: ModuleTemplate[] = []
}
