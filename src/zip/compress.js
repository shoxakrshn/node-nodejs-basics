import fs from 'node:fs';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { pipeline } from 'node:stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const srcPathFile = path.join(__dirname, 'files', 'fileToCompress.txt');
  const dstPathZFile = path.join(__dirname, 'files', 'archive.gz');

  const rs = fs.createReadStream(srcPathFile);
  const ws = fs.createWriteStream(dstPathZFile);

  const gzip = zlib.createGzip();

  // pipeline(srcPathFile, gzip, dstPathZFile, (error) => console.log(error));
  rs.pipe(gzip).pipe(ws);
};

await compress();
