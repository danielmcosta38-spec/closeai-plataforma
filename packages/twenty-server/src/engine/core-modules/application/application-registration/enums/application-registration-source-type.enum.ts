import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationRegistrationSourceType {
  NPM = 'npm',
  TARBALL = 'tarball',
  LOCAL = 'local',
  OAUTH_ONLY = 'oauth-only',
  // CloseAI: app que vem dentro da imagem e o servidor instala sozinho.
  BUILT_IN = 'built-in',
}

registerEnumType(ApplicationRegistrationSourceType, {
  name: 'ApplicationRegistrationSourceType',
});
