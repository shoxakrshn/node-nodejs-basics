import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filename = 'fileToRead.txt';
    const targetPathFilename = path.join(__dirname, 'files', filename);

    try {
      await fs.access(targetPathFilename);
    } catch {
      throw new Error('FS operation failed');
    }

    console.log(await fs.readFile(targetPathFilename, 'utf-8'));
  } catch (error) {
    console.log(error.message);
  }
};

await read();
