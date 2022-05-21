import { Command } from 'commander'
import fs from 'fs'
import YAML from 'yaml'
import { Article } from '../types'

export default function enableGenerate(program: Command) {
  program
    .command('generate')
    .description('Generate index.json')
    .action(() => {
      const dirs = fs.readdirSync(
        '.',
        { withFileTypes: true }
      ).filter((val) => val.isDirectory())

      const articles: Article[] = []
      
      for (let dir of dirs) {
        if (dir.name.startsWith('.')) continue

        const mdFile = fs.readFileSync(`${dir.name}/index.md`, { encoding: 'utf-8' })
        const fm = YAML.parse(mdFile.replaceAll('\r', '').split('---\n')[1])
        articles.push(fm)
      }
      fs.writeFileSync('index.json', JSON.stringify({
        articles
      }, null, 2))

      console.log('Generation done.')
    })
}
