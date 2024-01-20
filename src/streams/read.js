import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const targetPathFile = path.join(__dirname, 'files', 'fileToRead.txt');
  const rs = fs.createReadStream(targetPathFile);
  rs.pipe(process.stdout);
};

await read();
