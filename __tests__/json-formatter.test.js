import { jest } from '@jest/globals'
import path from 'path'
import { readFile } from 'fs/promises'

import { generateDocument } from '../src/main.js'

const __dirname = new URL('.', import.meta.url).pathname

beforeEach(() => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(Date.UTC(2022, 11, 14)))
})

afterAll(() => jest.useRealTimers())

test('given a directory of markdown files ensure the JSON output is created', async () => {
  const filePath = path.join(__dirname, './__fixtures__/main-datafiles')
  await generateDocument({ sourceDirectory: filePath })

  const jsonStringData = await readFile(path.join('README.json'), 'utf8')
  const jsonResult = JSON.parse(jsonStringData)
  expect(jsonResult).toMatchSnapshot()
})