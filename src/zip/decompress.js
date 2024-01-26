import fs from 'node:fs';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const srcPathZFile = path.join(__dirname, 'files', 'archive.gz');
  const dstPathFile = path.join(__dirname, 'files', 'fileToCompress.txt');

  const rs = fs.createReadStream(srcPathZFile);
  const ws = fs.createWriteStream(dstPathFile);
  const unzip = zlib.createUnzip();

  rs.pipe(unzip).pipe(ws);
};

await decompress();
