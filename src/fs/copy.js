import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const srcDirPath = path.join(__dirname, 'files');
    const dstDirPath = path.join(__dirname, 'files_copy');

    try {
      await fs.access(srcDirPath);
    } catch (error) {
      throw new Error('FS operation failed');
    }

    try {
      await fs.access(dstDirPath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await fs.mkdir(dstDirPath);

    const dirList = await fs.readdir(srcDirPath);

    await Promise.all(
      dirList.map(async (file) => {
        const srcFilePath = path.join(srcDirPath, file);
        const dstFilePath = path.join(dstDirPath, file);
        await fs.copyFile(srcFilePath, dstFilePath);
      })
    );

    console.log('Files have been copied');
  } catch (err) {
    console.log(err.message);
  }
};

await copy();
