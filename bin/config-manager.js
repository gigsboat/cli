import { readFile } from 'fs/promises'
import path from 'path'

const configFileName = 'gigsboat.json'
const __dirname = process.cwd()

export async function getConfig() {
  const jsonConfigFileContents = await readFile(
    path.join(__dirname, configFileName),
    'utf8'
  )
  const gigsConfig = JSON.parse(jsonConfigFileContents)

  return gigsConfig
}
