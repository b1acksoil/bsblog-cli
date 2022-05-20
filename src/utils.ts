import fs from 'fs'

export function checkIndexFile() {
  if (!fs.existsSync('index.json')) {
    console.log('ERROR: No index.json found in current directory.')
    process.exit(1)
  }
}