import { Command } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import { checkIndexFile } from '../utils'
import { IndexFile } from '../types'

export default function enableNew(program: Command) {
  program
    .command('new')
    .description('Create new article.')
    .action(() => {
      checkIndexFile()
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
        const file = fs.readFileSync('index.json', { encoding: 'utf-8' })
        const data: IndexFile = JSON.parse(file)
        data.articles.push({
          id: answer.id,
          title: answer.title,
          categories: answer.categories.trim() === '' ? [] : answer.categories.split(','),
          tags: answer.tags.trim() === '' ? [] : answer.tags.split(','),
          create: Date.now()
        })
        data.articles.sort((a, b) => b.create - a.create)
        fs.writeFileSync('index.json', JSON.stringify(data))

        fs.mkdirSync(answer.id)
        fs.writeFileSync(`${answer.id}/index.md`, '')
        
        console.log(`Successfully added new article '${answer.id}'.`)
      })
    })
}