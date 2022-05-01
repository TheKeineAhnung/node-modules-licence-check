# node-modules-licence-check

![Licence](https://img.shields.io/badge/License-CC--BY--3.0-yellow.svg?style=flat-square) ![Version](https://img.shields.io/github/package-json/v/thekeineahnung/node-modules-licence-check/main?style=flat-square&label=Version) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

node-modules-licence-check is a simple tool to check the licence of your node modules. It is written in TypeScript. Please take a look to the [licence](https://github.com/TheKeineAhnung/node-modules-licence-check/blob/main/LICENCE.md) before using it.

## Prerequisites

This project requires NodeJS (version >= 16.0.0) and NPM. [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are very easy to install. To make sure you have them available, you can try running the following command:

```
npm -v && node -v
```

## Installation

```
npm install node-modules-licence-check
```

## Quick start

After installation you can import the package with in your JavaScript or TypeScript file:

```ts
import { checkLicences } from 'node-modules-licence-check/build/lib/nodeModulesLicenceCheck';
```

To generate the documentation you can use the following function:

```ts
checkLicences(nodeModulesFolderPath?: string)
```

The nodeModulesFolderPath? parameter is an string to the node_modules folder. It is set default to the current folder.

The function returns a [Report](https://github.com/TheKeineAhnung/node-modules-licence-check/blob/main/lib/types/Report.ts)Array which contains the following properties:

```ts
status: 'success' | 'warning' | 'error';
message: string;
license: string;
package: string;
```

### Commands

- `npm run dev`: Starts the TypeScript compiler in watch mode.
- `npm run checkNodeModulesLicences`: Runs the licence check for development.
- `npm run build`: Starts the TypeScript compiler in build mode.

## Bug reports

Have you found a bug? Please open an [issue](https://github.com/TheKeineAhnung/node-modules-licence-check/issues/new).

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA--4.0-yellow.svg?style=flat-square
