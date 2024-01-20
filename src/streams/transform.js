import { Transform, pipeline } from 'node:stream';

const transform = async () => {
  const rs = process.stdin;
  const ws = process.stdout;

  const ts = new Transform({
    transform(chunk, enc, cb) {
      const chunkString = chunk.toString().trim();
      const reversedChunk = chunkString.split('').reverse().join('');

      this.push(reversedChunk + '\n');
      cb();
    },
  });

  pipeline(rs, ts, ws, (error) => console.log(error.message));
};

await transform();
