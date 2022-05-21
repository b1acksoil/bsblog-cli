import { Command } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import YAML from 'yaml'

export default function enableNew(program: Command) {
  program
    .command('new')
    .description('Create new article.')
    .action(() => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Title:',
          default: 'Untitled Article'
        },
        {
          type: 'input',
          name: 'id',
          message: 'ID:',
          default: 'untitled-' + Date.now()
        },
        {
          type: 'input',
          name: 'categories',
          message: 'Categories (Use \',\' to split):',
        },
        {
          type: 'input',
          name: 'tags',
          message: 'Tags (Use \',\' to split):',
        },
      ]).then((answer) => {
        const id: string = answer.id
        const title: string = answer.title
        const categories: string[] = answer.categories.trim() === '' ? [] : answer.categories.split(',')
        const tags: string[] = answer.tags.trim() === '' ? [] : answer.tags.split(',')
        const create: number = Date.now()

        fs.mkdirSync(id)
        fs.writeFileSync(
          `${id}/index.md`,
          '---\n' +
          YAML.stringify({
            id,
            title,
            create,
            categories,
            tags,
          }) +
          '---\n'
        )
        
        console.log(`Successfully added new article '${answer.id}'.`)
      })
    })
}