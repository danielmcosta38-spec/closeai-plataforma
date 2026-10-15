import { join } from 'path';

// Cada subpasta é o resultado do build de uma app (manifest.json,
// package.json e o código). A imagem final copia-as para aqui.
export const getBuiltInAppsPath = (): string =>
  process.env.BUILT_IN_APPS_PATH ?? join(process.cwd(), 'built-in-apps');

// O nome da pasta vai para sourcePackage: só letras, dígitos, - e _,
// para nunca sair da pasta das apps.
export const isValidBuiltInAppFolderName = (name: string): boolean =>
  /^[a-z0-9][a-z0-9_-]*$/i.test(name);
