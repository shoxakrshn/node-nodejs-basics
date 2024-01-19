import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  try {
    const targetPathFilename = path.join(
      __dirname,
      'files',
      'fileToRemove.txt'
    );

    try {
      await fs.access(targetPathFilename);
    } catch {
      throw new Error('FS operation failed');
    }

    await fs.rm(targetPathFilename);
    console.log('File has been deleted');
  } catch (error) {
    console.log(error.message);
  }
};

await remove();
