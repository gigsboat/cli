import { URL } from 'url'
import path from 'path'
import { generateDocument } from '../src/main.js'

const __dirname = new URL('.', import.meta.url).pathname

test('given a directory of markdown files a full document is rendered', async () => {
  const filePath = path.join(__dirname, './__fixtures__/main-datafiles')
  const jsonResult = await generateDocument({ sourceDirectory: filePath })
  expect(jsonResult).toMatchSnapshot()
})

test('given a directory of markdown files a full document is rendered along with pre and post content', async () => {
  const filePath = path.join(__dirname, './__fixtures__/main-datafiles')
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
