import { Command } from 'commander'
import fs from 'fs'
import { IndexFile } from '../types'

export default function enableInit(program: Command) {
  program
    .command('init')
    .description('Initialize assets directory.')
    .action(() => {
      if (fs.existsSync('index.json')) {
        console.log('ERROR: Already initialized.')
        process.exit(1)
      }

      const data: IndexFile = {
        articles: []
      }

      fs.writeFileSync('index.json', JSON.stringify(data))
    })
}