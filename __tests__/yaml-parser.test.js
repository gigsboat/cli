import { URL } from 'url'
import path from 'path'

import { convertToJson } from '../src/utils/yaml-parser.js'

const __dirname = new URL('.', import.meta.url).pathname

test('convert markdown file to json', async () => {
  const filePath = path.join(__dirname, './__fixtures__/datafiles/event-ok.md')
  const jsonResult = await convertToJson(filePath)
  expect(jsonResult).toMatchSnapshot()
})
