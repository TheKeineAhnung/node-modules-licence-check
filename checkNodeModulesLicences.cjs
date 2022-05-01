#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).argv;

// eslint-disable-next-line no-sync
if (!fs.existsSync(args.p)) {
  process.exit(1);
}

const tsNodeDir = path.join(require.resolve('ts-node'), '..', '..');

const absoluteEntryPath = path.join(
  __dirname,
  'build',
  'lib',
  'bin',
  'nodeModulesLicenceCheck.js'
);

const result = shelljs.exec(
  `node --loader='file://${tsNodeDir}/esm' --experimental-specifier-resolution=node --no-warnings '${absoluteEntryPath}' ${args.p}`,
  // eslint-disable-next-line no-process-env
  { env: process.env, cwd: process.cwd(), silent: false }
);

process.exit(result.code);
