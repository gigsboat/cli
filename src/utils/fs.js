import { readdir } from 'fs/promises'
import path from 'path'

/**
 *
 * @param {*} directoryPath
 * @returns array of files
 */
export async function getAllFiles(directoryPath) {
  const filesFound = []
  try {
    const files = await readdir(directoryPath, { withFileTypes: true })
    for (const file of files) {
      if (file.isDirectory()) {
        const filesFoundRecursively = await getAllFiles(
          path.join(directoryPath, file.name)
        )
        filesFound.push(...filesFoundRecursively)
      } else {
        filesFound.push(path.join(directoryPath, file.name))
      }
    }

    return filesFound
  } catch (err) {
    // console.error(err)
    return []
  }
}
