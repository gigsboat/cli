import { URL } from 'url'
import path from 'path'
import { getAllFiles } from '../src/utils/fs.js'

const __dirname = new URL('.', import.meta.url).pathname

test('fs utility is able to successfully recursive directories to find markdown files', async () => {
  const directoryPath = path.join(__dirname, './__fixtures__/filesglobbing')
  const allFiles = await getAllFiles(directoryPath)
  for (const file of allFiles) {
    expect(file.endsWith('.md')).toBe(true)
  }
  expect(allFiles).toHaveLength(2)
})

test('fs utility returns an empty array if it cant find a directory to work at', async () => {
  const directoryPath = path.join(
    __dirname,
    '/tmp/a/b/c/d/nonexistent/and/madeup'
  )

  const allFiles = await getAllFiles(directoryPath)
  expect(allFiles).toHaveLength(0)
})
