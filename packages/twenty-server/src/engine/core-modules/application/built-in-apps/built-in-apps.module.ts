import { Module } from '@nestjs/common';

import { ApplicationRegistrationModule } from 'src/engine/core-modules/application/application-registration/application-registration.module';
import { BuiltInAppsService } from 'src/engine/core-modules/application/built-in-apps/built-in-apps.service';
import { PreInstalledAppsModule } from 'src/engine/core-modules/application/pre-installed-apps/pre-installed-apps.module';

@Module({
  imports: [ApplicationRegistrationModule, PreInstalledAppsModule],
  providers: [BuiltInAppsService],
  exports: [BuiltInAppsService],
})
export class BuiltInAppsModule {}
