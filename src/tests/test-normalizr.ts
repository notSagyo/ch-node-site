import { testFunction } from './tests';
import { denormalize, normalize, schema, Schema } from 'normalizr';
import { UserDto, MessageDto } from '../types/dtos';
import { inspect } from 'util';
import MessageDao from '../modules/chat/chat.dao';

export const testNormalizr = async () => {
  const authorSchema: Schema<UserDto> = new schema.Entity('authors');
  const messageSchema: Schema<MessageDto> = new schema.Entity('messages', {
    author: authorSchema,
  });

  const messages = await MessageDao.dao.getAll().then((messages) => {
    console.log(typeof []);
    return messages;
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let normalizedMessages: any;
  let denormalizedMessages: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */

  await testFunction('Normalize messages', () => {
    normalizedMessages = normalize(messages, [messageSchema]);
    console.log(
      'normalizedMessages:',
      inspect(normalizedMessages, false, 12, true)
    );
  });

  await testFunction('Denormalize messages', () => {
    denormalizedMessages = denormalize(
      normalizedMessages.result,
      [messageSchema],
      normalizedMessages.entities
    );
    console.log('denormalizedMessages:', denormalizedMessages);
  });

  await testFunction('Compression rate', () => {
    const compressed = JSON.stringify(normalizedMessages);
    const uncompressed = JSON.stringify(denormalizedMessages);
    console.log(`normalized: ${compressed.length} bytes`);
    console.log(`denormalized: ${uncompressed.length} bytes`);
    console.log(
      `compression rate: ${(
        100 -
        (compressed.length / uncompressed.length) * 100
      ).toFixed(2)}%`
    );
  });
};
