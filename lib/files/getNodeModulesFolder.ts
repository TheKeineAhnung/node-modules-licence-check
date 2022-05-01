import { dirname } from 'path';

const getNodeModulesFolder = function (isBin: boolean): string {
  let parentFolder: string = __dirname;

  do {
    parentFolder = dirname(parentFolder);
    if (parentFolder.length === 3) {
      if (isBin) {
        parentFolder = `${dirname(dirname(__dirname))}\\node_modules\\`;
      } else {
        parentFolder = `${dirname(
          dirname(dirname(__dirname))
        )}\\node_modules\\`;
      }
      break;
    }
  } while (!parentFolder.endsWith('node_modules'));

  return parentFolder;
};

export { getNodeModulesFolder };
