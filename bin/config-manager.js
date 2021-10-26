import { promises as fs } from 'fs'
import path from 'path'

const configFileName = 'gigsboat.json'
const __dirname = process.cwd()

export async function getConfig() {
  const jsonConfigFileContents = await fs.readFile(
    path.join(__dirname, configFileName),
    'utf8'
  )
  const gigsConfig = JSON.parse(jsonConfigFileContents)

  // @TODO
  // add AJV validation here for the schema
  // in another function and use defaults
  // like here: https://ajv.js.org/guide/modifying-data.html#assigning-defaults

  return gigsConfig
}
