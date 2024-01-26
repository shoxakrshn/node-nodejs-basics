import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  try {
    const dirPath = path.join(__dirname, 'files');

    try {
      await fs.access(dirPath);
    } catch {
      throw new Error('FS operation failed');
    }

    const listFilenames = await fs.readdir(dirPath);
    listFilenames.forEach((filename) => console.log(filename));
  } catch (error) {
    console.log(error.message);
  }
};

await list();
