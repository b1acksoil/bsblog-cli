#!/usr/bin/env node

import { program } from 'commander'
import enableGenerate from './commands/generate'
import enableNew from './commands/new'
const { version } = require('../package.json')

program
  .name('bsblog')
  .version(version, '-v, --version')
  .enablePositionalOptions()

enableNew(program)
enableGenerate(program)

program.parse(process.argv)
