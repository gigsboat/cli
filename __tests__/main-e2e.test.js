import { spawnSync } from 'child_process';
import { tmpdir } from 'os';
import { unlinkSync, readFileSync } from 'fs'
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname
test('spawn the cli to process data and ensure markdown file is generated correctly', async () => {

    const cliExecutable = path.join(__dirname, '/../bin/cli.js')
    const projectFixtures = path.join(__dirname, './__fixtures__/main-datafiles/myapp/pages')
    const projectOutputFile = path.join(tmpdir(), 'test.md')

    
    // specifically need to mutate the process.argv array to avoid the cli
    // generating an "updated at" timestamp so we can always match the snapshot
    // and so we add a TEST_E2E flag to it
    const spawnedCliEnvironmentVariables = process.env
    spawnedCliEnvironmentVariables.TEST_E2E = 'true'

    const cliData = spawnSync(cliExecutable, ['--source-directory', projectFixtures, '--output-file', projectOutputFile], { shell: true, env: spawnedCliEnvironmentVariables})

    const cliOutput = cliData.output.toString();
    
    expect(cliOutput).toContain('loaded configuration:')
    expect(cliOutput).toContain('source directory: ' + projectFixtures)
    expect(cliOutput).toContain('output file: ' + projectOutputFile)

    const expectedMarkdownOutput = readFileSync(projectOutputFile, 'utf8')
    expect(expectedMarkdownOutput).toMatchSnapshot()

    // cleanup temporary files
    unlinkSync(projectOutputFile)
})