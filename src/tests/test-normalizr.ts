import { messagesDao } from '../daos/messages-dao-mongo';
import { testFunction } from './tests';
import * as normalizr from 'normalizr';
import { iUser, iMessage } from '../types/models';
import { inspect } from 'util';

export const testNormalizr = async () => {
  const authorSchema: normalizr.Schema<iUser> = new normalizr.schema.Entity('authors');
  const messageSchema: normalizr.Schema<iMessage> = new normalizr.schema.Entity('messages', {
    author: authorSchema
  });

  const messages = await messagesDao.getAll().then(messages => { console.log(typeof []); return messages;});
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let normalizedMessages: any;
  let denormalizedMessages: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */

  await testFunction('Normalize messages', () => {
    normalizedMessages = normalizr.normalize(messages, [ messageSchema ]);
    console.log('normalizedMessages:', inspect(normalizedMessages, false, 12, true));
  });

  await testFunction('Denormalize messages', () => {
    denormalizedMessages = normalizr.denormalize(normalizedMessages.result, [ messageSchema ], normalizedMessages.entities);
    console.log('denormalizedMessages:', denormalizedMessages);
  });

  await testFunction('Compression rate', () => {
    const compressed = JSON.stringify(normalizedMessages);
    const uncompressed = JSON.stringify(denormalizedMessages);
    console.log(`normalized: ${compressed.length} bytes`);
    console.log(`denormalized: ${uncompressed.length} bytes`);
    console.log(`compression rate: ${(100 - compressed.length / uncompressed.length * 100).toFixed(2)}%`);
  });
};
