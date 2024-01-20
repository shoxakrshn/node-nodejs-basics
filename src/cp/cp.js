import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import childProcess from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = childProcess.spawn('node', [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data.toString());
  });

  child.on('error', (err) => {
    console.error('Error:', err);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['hello', 'child']);
