import autocannon from 'autocannon';
import { PassThrough } from 'stream';

export default async function runAutocannon(url: string) {
  console.log('Running benchmarks...');
  const buf: any = [];
  const outputStream = new PassThrough();

  const inst = await autocannon(
    {
      url,
      connections: 100,
      duration: 20,
    },
    console.log
  );

  autocannon.track(inst, { outputStream });

  outputStream.on('data', (data) => buf.push(data));
  inst.on('done', () => process.stdout.write(Buffer.concat(buf)));
}
