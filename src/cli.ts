#!/usr/bin/env node

import { program } from 'commander'
import { version } from '../package.json'
import enableInit from './commands/init'
import enableNew from './commands/new'

program
  .name('bsblog')
  .version(version, '-v, --version')
  .enablePositionalOptions()

enableInit(program)
enableNew(program)

program.parse(process.argv)
