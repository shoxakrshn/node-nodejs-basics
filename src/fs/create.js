import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  try {
    const dstFilePath = path.join(__dirname, 'files', 'fresh.txt');

    try {
      await fs.access(dstFilePath);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }

      await fs.writeFile(dstFilePath, 'I am fresh and young');

      console.log('The file fresh.txt has been created');
    }
  } catch (err) {
    console.log(err.message);
  }
};

await create();
