#!/usr/bin/env node

import { program } from 'commander'
import enableInit from './commands/init'
import enableNew from './commands/new'
const { version } = require('../package.json')

program
  .name('bsblog')
  .version(version, '-v, --version')
  .enablePositionalOptions()

enableInit(program)
enableNew(program)

program.parse(process.argv)
