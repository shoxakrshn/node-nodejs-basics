import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  try {
    const srcPathFilename = path.resolve(
      __dirname,
      'files',
      'wrongFilename.txt'
    );

    const dstPathFilename = path.resolve(
      __dirname,
      'files',
      'properFilename.md'
    );

    try {
      await fs.access(srcPathFilename);
    } catch {
      throw new Error('FS operation failed');
    }

    try {
      await fs.access(dstPathFilename);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await fs.rename(srcPathFilename, dstPathFilename);
    console.log('File has been renamed');
  } catch (error) {
    console.log(error.message);
  }
};

await rename();
