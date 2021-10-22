import frontMatter from 'front-matter'
import { readFile } from 'fs/promises'

export async function convertToJson(filePath) {
  const fileContent = await readFile(filePath, 'utf8')
  const json = frontMatter(fileContent)
  return json
}
