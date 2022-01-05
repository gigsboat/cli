import { URL } from 'url'
import { jest } from '@jest/globals'
import path from 'path'
import { generateDocument } from '../src/main.js'

const __dirname = new URL('.', import.meta.url).pathname

beforeEach(() => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(Date.UTC(2021, 11, 14)))
})

afterAll(() => jest.useRealTimers())

test('given a directory of markdown files a full document is rendered', async () => {
  const filePath = path.join(__dirname, './__fixtures__/main-datafiles')
  const jsonResult = await generateDocument({ sourceDirectory: filePath })
  expect(jsonResult).toMatchSnapshot()
})

test('given a directory of markdown files a full document is rendered along with pre and post content', async () => {
  const filePath = path.join(__dirname, './__fixtures__/main-datafiles')
  console.log('---------------------------->')
  console.log(filePath)
  console.log('---------------------------->')
  const jsonResult = await generateDocument({
    sourceDirectory: filePath,
    preContent: [
      {
        raw: '<p> actual html is allowed too </p>'
      },
      {
        format: [
          {
            p: 'Liran Tal'
          }
        ]
      }
    ],
    postContent: [
      {
        raw: '<p align="center"> rendered in postcontent </p>'
      },
      {
        format: [
          {
            p: 'Thank you!'
          }
        ]
      }
    ]
  })
  expect(jsonResult).toMatchSnapshot()
})
