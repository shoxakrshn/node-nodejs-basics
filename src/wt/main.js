import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { Worker } from 'node:worker_threads';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const targetPathFile = path.join(__dirname, 'worker.js');
  const cpus = os.cpus().length;

  const workerPromises = [];
  const workerThreads = [];

  for (let i = 0; i < cpus; i += 1) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(targetPathFile);
      workerThreads.push(worker);

      worker.postMessage(10 + i);

      worker.on('message', (result) =>
        resolve({ status: 'resolved', data: result })
      );

      worker.on('error', () => reject({ status: 'error', data: null }));

      worker.on('exit', (code) => {
        if (code !== 0) reject({ status: 'error', data: null });
      });
    });

    workerPromises.push(promise);
  }

  const resolvedWorkers = await Promise.allSettled(workerPromises);
  const result = resolvedWorkers.map((response) => response.value);

  console.log(result);

  workerThreads.forEach((worker) => worker.terminate());
};

await performCalculations();
