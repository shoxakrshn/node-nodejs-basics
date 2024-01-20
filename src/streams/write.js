import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const targetPathFile = path.join(__dirname, 'files', 'fileToWrite.txt');
  const ws = fs.createWriteStream(targetPathFile);
  process.stdin.pipe(ws);
};

await write();
