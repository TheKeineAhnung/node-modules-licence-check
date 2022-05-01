import { PackageJsonInformation } from '../types/PackageJsonInformation';
import { readFileSync } from 'fs';

const getPackageContent = function (path: string): PackageJsonInformation {
  const information: PackageJsonInformation = JSON.parse(
    readFileSync(path).toString()
  );

  return information;
};

export { getPackageContent };
