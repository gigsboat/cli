import { getConfig } from '../bin/config-manager.js'
import { promises as fs } from 'fs'
// eslint-disable-next-line node/no-extraneous-import
import { jest } from '@jest/globals'

test('returns the result of a config file', async () => {
  const mockedConfig = {
    output: {
      markdownFile: 'README-gigs.md'
    },
    preContent: [
      {
        raw: "<p align='center'>hello</p>"
      },
      {
        format: [
          {
            h1: 'hello'
          }
        ]
      }
    ]
  }

  jest
    .spyOn(fs, 'readFile')
    .mockImplementation(() => Promise.resolve(JSON.stringify(mockedConfig)))

  const gigsConfig = await getConfig()
  expect(gigsConfig).toMatchObject(mockedConfig)
})
