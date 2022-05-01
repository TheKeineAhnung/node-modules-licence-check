import { dirname } from 'path';
import { readdirSync } from 'fs';

const getLicenceCheckPath = function (): string | undefined {
  let filePath: string = __dirname;

  do {
    filePath = dirname(filePath);
    if (filePath.length === 3) {
      return undefined;
    }
  } while (!readdirSync(filePath).includes('licenceCheck.json'));

  filePath += '\\licenceCheck.json';

  return filePath;
};

export { getLicenceCheckPath };
