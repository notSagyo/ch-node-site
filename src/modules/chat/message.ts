import { v4 } from 'uuid';
import { MessageDto, MessageDtoPayload } from '../../types/dtos';
import { IParser } from '../../types/types';
import { logger } from '../../utils/logger';

export default class Message implements MessageDto {
  content: string;
  author: string;
  time: number;
  id: string;

  constructor(author: string, content: string, time: number, id: string) {
    this.content = content;
    this.author = author;
    this.time = time;
    this.id = id;
  }

  static fromDto(dto: MessageDtoPayload): Message {
    const parsedMessage = parseMessage(dto);
    if (parsedMessage == null)
      throw new Error('Message: error parsing message');
    return new Message(
      parsedMessage.author,
      parsedMessage.content,
      parsedMessage.time,
      parsedMessage.id
    );
  }

  toDto(): MessageDto {
    const { author, content, time, id } = this;
    return { author, content, time, id };
  }
}

export const parseMessage: IParser<MessageDto> = (msg) => {
  if (msg == null) return null;
  const id = typeof msg?.id === 'string' ? msg.id : v4();
  const author = typeof msg?.author === 'string' ? msg.author : null;
  const time =
    msg?.time && !isNaN(Number(msg?.time)) ? Number(msg.time) : Date.now();
  const content =
    typeof msg?.content === 'string' && msg?.content.length > 0
      ? msg.content
      : '';

  if (author == null) {
    logger.error('Invalid message author');
    return null;
  }

  return { id, time, author, content };
};
