import { promises as fs } from 'fs'
import ajv from 'ajv'
import path from 'path'

const configFileName = 'gigsboat.json'
const __dirname = process.cwd()

export async function getConfig() {
  let gigsConfig = {}
  try {
    const jsonConfigFileContents = await fs.readFile(
      path.join(__dirname, configFileName),
      'utf8'
    )
    gigsConfig = JSON.parse(jsonConfigFileContents)
  } catch (error) {
    // debug
    // console.error(error)
  }

  validateConfig(gigsConfig)
  return gigsConfig
}

function validateConfig(config) {
  const gigsConfigSchema = {
    type: 'object',
    properties: {
      input: {
        type: 'object',
        properties: {
          sourceDirectory: { type: 'string', default: 'pages' }
        },
        default: {}
      },
      output: {
        type: 'object',
        properties: {
          markdownFile: { type: 'string', default: 'README-gigsfile.md' }
        },
        default: {}
      },
      preContent: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            raw: { type: 'string' },
            format: { type: 'array', items: { type: 'object' } }
          }
        }
      },
      postContent: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            raw: { type: 'string' },
            format: { type: 'array', items: { type: 'object' } }
          }
        }
      }
    }
  }

  const schemaValidator = new ajv({ useDefaults: true })
  const schemaValidation = schemaValidator.compile(gigsConfigSchema)
  schemaValidation(config)
  return config
}
