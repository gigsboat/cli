import { promises as fs } from 'fs'
import ajv from 'ajv'
import path from 'path'
import DebugLogger from 'debug'

const configFileName = 'gigsboat.json'
const __dirname = process.cwd()
let gigsConfig = undefined

const debug = DebugLogger('gigsboat:config')

export async function getConfig(providedConfig) {
  if (gigsConfig) {
    debug('using config from cache')
    return gigsConfig
  }

  if (providedConfig) {
    gigsConfig = providedConfig
  } else {
    try {
      debug('opening config file for reading: %s', configFileName)
      const jsonConfigFileContents = await fs.readFile(
        path.join(__dirname, configFileName),
        'utf8'
      )
      gigsConfig = JSON.parse(jsonConfigFileContents)
    } catch (error) {
      // debug message and silently ignore
      debug('encountered error while processing JSON config file:')
      debug(error)
    }
  }

  gigsConfig = validateConfig(gigsConfig)
  return gigsConfig
}

function validateConfig(config) {
  if (!config) {
    debug('config is empty so falling back to defaults')
    config = {}
  }

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
          markdownFile: { type: 'string', default: 'README-gigsfile.md' },
          includePictureGalleryYearly: { type: 'boolean', default: true }
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
  const isValid = schemaValidation(config)
  debug('is configuration schema valid: %s', isValid)
  return config
}
