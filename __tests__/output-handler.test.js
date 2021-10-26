import { processOutput } from '../bin/output-handler.js'
import { jest } from '@jest/globals'
import fs from 'fs/promises'

jest.spyOn(fs, 'writeFile')

const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

test('document is saved to file', async () => {
  fs.writeFile.mockReturnValue(null)

  await processOutput({
    document: 'something something',
    outputFile: 'test.txt'
  })
  expect(fs.writeFile).toHaveBeenCalledTimes(1)
})

test('document is outputted to the stdout', async () => {
  fs.writeFile.mockReturnValue(null)

  await processOutput({ document: 'nothing at all' })
  expect(consoleSpy).toHaveBeenCalledTimes(1)
  expect(consoleSpy).toHaveBeenCalledWith('nothing at all')
})
