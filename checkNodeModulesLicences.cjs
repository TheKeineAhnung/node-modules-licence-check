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

const absoluteEntryPath = path.join(
  __dirname,
  'build',
  'lib',
  'bin',
  'nodeModulesLicenceCheck.js'
);

const cmd = `node ${absoluteEntryPath} --experimental-specifier-resolution=node --no-warnings`;

const result = shelljs.exec(
  cmd,
  // eslint-disable-next-line no-process-env
  { env: process.env, cwd: process.cwd(), silent: false }
);

process.exit(result.code);
