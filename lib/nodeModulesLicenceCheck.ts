import { dirname } from 'path';
import { getLicenceCheckPath } from './files/getLicenceCheckFile';
import { getNodeModules } from './files/getNodeModules';
import { getNodeModulesFolder } from './files/getNodeModulesFolder';
import { getPackageContent } from './files/getPackageContent';
import { getPackageFiles } from './files/getPackageFiles';
import { isValidNodeModulesFolderPath } from './files/isValidNodeModulesFolderPath';
import { LicenceCheckFile } from './types/LicenceCheckFile';
import { PackageJsonInformation } from './types/PackageJsonInformation';
import { Report } from './types/Report';
import { existsSync, readFileSync } from 'fs';

const checkLicences = function (nodeModulesFolderPath?: string): Report[] {
  const report: Report[] = [];
  let currentReport: Report;
  let finalNodeModulesFolderPath: string | undefined = nodeModulesFolderPath;

  if (!isValidNodeModulesFolderPath(finalNodeModulesFolderPath)) {
    finalNodeModulesFolderPath = getNodeModulesFolder(false);
  }

  if (typeof finalNodeModulesFolderPath !== 'string') {
    currentReport = {
      status: 'error',
      message: 'No node_modules folder found',
      license: '',
      package: ''
    };
    report.push(currentReport);

    return report;
  }

  if (!finalNodeModulesFolderPath.endsWith('\\')) {
    finalNodeModulesFolderPath += '\\';
  }

  let licenceCheckFile: string | undefined = getLicenceCheckPath();

  if (licenceCheckFile === undefined) {
    licenceCheckFile = `${dirname(dirname(__dirname))}\\licenceCheck.json`;
  }

  if (!existsSync(licenceCheckFile)) {
    currentReport = {
      status: 'error',
      message: 'No licenceCheck.json file found',
      license: '',
      package: ''
    };
    report.push(currentReport);

    return report;
  }

  const licenceCheckFileContent: LicenceCheckFile = JSON.parse(
    readFileSync(licenceCheckFile).toString()
  );

  const allowedLicences: string[] = licenceCheckFileContent.allowedLicences;
  let ignorablePackages: string[];

  if (licenceCheckFileContent.ignorablePackages !== undefined) {
    ignorablePackages = licenceCheckFileContent.ignorablePackages;
  } else {
    ignorablePackages = [];
  }

  const nodeModulesFolders = getNodeModules(finalNodeModulesFolderPath);

  const packageFiles: (string | boolean)[] =
    getPackageFiles(nodeModulesFolders);

  if (packageFiles.includes(false)) {
    currentReport = {
      status: 'error',
      message: 'A detected library folder doesn`t exists anymore.',
      license: '',
      package: ''
    };
    report.push(currentReport);

    return report;
  }

  for (const packageFile of packageFiles) {
    if (typeof packageFile !== 'string') {
      currentReport = {
        status: 'error',
        message: 'A detected library folder doesn`t exists anymore.',
        license: '',
        package: ''
      };
      report.push(currentReport);

      return report;
    }

    if (!packageFile.endsWith('package.json')) {
      if (packageFile.endsWith('.bin') || packageFile.endsWith('.bin\\')) {
        continue;
      } else {
        currentReport = {
          status: 'warning',
          message: `The '${packageFile}' folder doesn't contain a package.json file. You must check it manually.`,
          license: 'unknown',
          package: packageFile.split('\\')[packageFile.split('\\').length - 1]
        };

        report.push(currentReport);

        continue;
      }
    }

    const information: PackageJsonInformation = getPackageContent(packageFile);

    if (information.license) {
      if (
        !allowedLicences.includes(information.license) &&
        !ignorablePackages.includes(information.name)
      ) {
        currentReport = {
          status: 'error',
          message: `The '${information.name}' package in version ${information.version} has a licence that is not allowed.`,
          license: information.license,
          package: information.name
        };

        report.push(currentReport);
      }
    } else {
      currentReport = {
        status: 'warning',
        message: `The '${information.name}' package in version ${information.version} has no identified licence. You must check it manually.`,
        license: 'unknown',
        package: information.name
      };

      report.push(currentReport);
    }
  }

  return report;
};

export { checkLicences };
