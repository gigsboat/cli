import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export function parseCliArgs() {
  // supporting right now:
  // -s --source-directory=<path>
  // -o --output-file=<path>
  const cliOptions = yargs(hideBin(process.argv))
    .options({
      o: {
        alias: 'output-file',
        type: 'string',
        default: 'README-gigsfile.md'
      },
      s: {
        alias: 'source-directory',
        type: 'string',
        default: 'pages'
      }
    })
    .parse()

  return cliOptions
}
