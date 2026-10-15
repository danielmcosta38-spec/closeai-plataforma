import { Command, CommandRunner } from 'nest-commander';

import { BuiltInAppsService } from 'src/engine/core-modules/application/built-in-apps/built-in-apps.service';

// CloseAI: chamado pelo entrypoint do server a cada arranque. Idempotente.
@Command({
  name: 'closeai:sync-built-in-apps',
  description:
    'Register the apps shipped inside the image and install them on every workspace',
})
export class SyncBuiltInAppsCommand extends CommandRunner {
  constructor(private readonly builtInAppsService: BuiltInAppsService) {
    super();
  }

  override async run(): Promise<void> {
    await this.builtInAppsService.syncAll();
  }
}
