import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
const crypto = await import('node:crypto');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function calculateHash() {
  const targetPathFile = path.join(
    __dirname,
    'files',
    'fileToCalculateHashFor.txt'
  );

  const rs = fs.createReadStream(targetPathFile);
  const ws = process.stdout;
  const hashStream = crypto.createHash('sha256');

  rs.on('data', (chunk) => hashStream.update(chunk));
  rs.on('end', () => {
    const hash = hashStream.digest('hex');
    ws.write(hash);
  });
}

await calculateHash();
