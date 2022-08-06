import { spawnSync } from 'child_process';
import { tmpdir } from 'os';
import { unlinkSync } from 'fs'
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname
test('spawn the cli to process data and ensure markdown file is generated correctly', async () => {

    const cliExecutable = path.join(__dirname, '/../bin/cli.js')
    const projectFixtures = path.join(__dirname, './__fixtures__/main-datafiles/myapp/pages')
    const projectOutputFile = path.join(tmpdir(), 'test.md')

    const cliData = spawnSync(cliExecutable, ['--source-directory', projectFixtures, '--output-file', projectOutputFile], { shell: true});

    const cliOutput = cliData.output.toString();
    
    expect(cliOutput).toContain('loaded configuration:')
    expect(cliOutput).toContain('source directory: ' + projectFixtures)
    expect(cliOutput).toContain('output file: ' + projectOutputFile)

    // cleanup temporary files
    unlinkSync(projectOutputFile)
})