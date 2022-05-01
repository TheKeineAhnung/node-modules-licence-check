import { existsSync } from 'fs';

const isValidNodeModulesFolderPath = (path: string | undefined): boolean => {
  if (path === undefined) {
    return false;
  }

  if (!existsSync(path)) {
    return false;
  }

  if (
    !path.endsWith('node_modules') &&
    !path.endsWith('node_modules\\') &&
    !path.endsWith('node_modules/')
  ) {
    return false;
  }

  return true;
};

export { isValidNodeModulesFolderPath };
