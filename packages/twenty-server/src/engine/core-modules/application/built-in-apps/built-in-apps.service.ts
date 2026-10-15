import { Injectable, Logger } from '@nestjs/common';

import { promises as fs } from 'fs';
import { join } from 'path';

import { type Manifest } from 'twenty-shared/application';
import { isDefined } from 'twenty-shared/utils';
import { type PackageJson } from 'type-fest';

import { readJsonFile } from 'src/engine/core-modules/application/application-package/utils/read-json-file.util';
import { ApplicationRegistrationService } from 'src/engine/core-modules/application/application-registration/application-registration.service';
import {
  getBuiltInAppsPath,
  isValidBuiltInAppFolderName,
} from 'src/engine/core-modules/application/built-in-apps/get-built-in-apps-path.util';
import { PreInstalledAppsService } from 'src/engine/core-modules/application/pre-installed-apps/pre-installed-apps.service';

// CloseAI: as apps que vêm dentro da imagem ficam registadas e instaladas em
// todas as organizações sem ninguém as publicar. Corre no arranque do server.
@Injectable()
export class BuiltInAppsService {
  private readonly logger = new Logger(BuiltInAppsService.name);

  constructor(
    private readonly applicationRegistrationService: ApplicationRegistrationService,
    private readonly preInstalledAppsService: PreInstalledAppsService,
  ) {}

  async syncAll(): Promise<void> {
    const appsPath = getBuiltInAppsPath();
    const entries = await fs
      .readdir(appsPath, { withFileTypes: true })
      .catch(() => []);

    for (const entry of entries) {
      if (!entry.isDirectory() || !isValidBuiltInAppFolderName(entry.name)) {
        continue;
      }

      try {
        await this.sync(join(appsPath, entry.name), entry.name);
      } catch (error) {
        this.logger.error(
          `Failed to sync built-in app ${entry.name}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
  }

  private async sync(appPath: string, folderName: string): Promise<void> {
    const manifest = await readJsonFile<Manifest>(appPath, 'manifest.json');
    const packageJson = await readJsonFile<PackageJson>(
      appPath,
      'package.json',
    );

    if (!isDefined(manifest?.application?.universalIdentifier)) {
      this.logger.warn(`Skipping built-in app ${folderName}: no manifest`);

      return;
    }

    const registration = await this.applicationRegistrationService.upsertBuiltIn(
      { folderName, manifest, version: packageJson?.version ?? null },
    );

    if (!isDefined(registration)) {
      return;
    }

    await this.preInstalledAppsService.backfillApplicationOnAllWorkspaces(
      registration.id,
    );

    this.logger.log(
      `Built-in app ${folderName} (${registration.universalIdentifier}) at version ${registration.latestAvailableVersion ?? 'unknown'}`,
    );
  }
}
