import { getNodeModulesFolder } from './getNodeModulesFolder';
import { isValidNodeModulesFolderPath } from './isValidNodeModulesFolderPath';
import { NodeModules } from '../types/NodeModules';
import { readdirSync, statSync } from 'fs';

const getNodeModules = function (
  nodeModulesFolder: string = __dirname
): NodeModules[] {
  let finalNodeModulesFolder: string;

  if (nodeModulesFolder === __dirname) {
    finalNodeModulesFolder = getNodeModulesFolder(false);
  } else {
    if (!isValidNodeModulesFolderPath(nodeModulesFolder)) {
      finalNodeModulesFolder = getNodeModulesFolder(false);
    }
    finalNodeModulesFolder = nodeModulesFolder;
  }

  const nodeModules: NodeModules[] = [];

  for (const elem of readdirSync(finalNodeModulesFolder)) {
    nodeModules.push(`${finalNodeModulesFolder}${elem}`);
    const subPath = `${finalNodeModulesFolder}${elem}`;
    const stats = statSync(subPath);

    const getSubNodeModules = function (path: string): NodeModules[] {
      const subFolders = readdirSync(path);
      const folders: NodeModules[] = [];

      for (const subFolder of subFolders) {
        if (subFolder === 'node_modules') {
          for (const subLibrary of readdirSync(`${path}\\node_modules`)) {
            folders.push(`${path}\\node_modules\\${subLibrary}`);
          }
        }
      }

      return folders;
    };

    if (stats.isDirectory()) {
      nodeModules.push(...getSubNodeModules(subPath));
    }
  }

  return nodeModules;
};

export { getNodeModules };
