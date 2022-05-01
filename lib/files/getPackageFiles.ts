import { existsSync, readdirSync, statSync } from 'fs';

const getPackageFiles = function (
  nodeModuleFolders: string[]
): (string | boolean)[] {
  const packageJsonPaths: (string | boolean)[] = [];

  for (const nodeModuleFolder of nodeModuleFolders) {
    if (!existsSync(nodeModuleFolder)) {
      packageJsonPaths.push(false);
      continue;
    }
    const stats = statSync(nodeModuleFolder);

    if (stats.isDirectory()) {
      if (readdirSync(nodeModuleFolder).includes('package.json')) {
        packageJsonPaths.push(`${nodeModuleFolder}\\package.json`);
        continue;
      } else {
        packageJsonPaths.push(nodeModuleFolder);
      }
    }
  }

  return packageJsonPaths;
};

export { getPackageFiles };
