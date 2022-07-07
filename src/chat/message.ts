import { v4 } from 'uuid';
import { parseUser } from '../models/user';
import { iMessage } from '../types';

export const parseMessage = (obj: Record<string, unknown> | Partial<iMessage>): iMessage | null => {
  const author = parseUser(obj?.author as Record<string, unknown>);
  const time = !isNaN(Number(obj?.time)) ? Number(obj.time) : Date.now();
  const content = typeof obj?.content === 'string' && obj?.content.length > 0 ? obj.content : '';
  const id = typeof obj?.id === 'string' ? obj.id : v4();

  if (author != null)
    return { id, time, author, content };
  return null;
};

export default class Message {
  // Manual ID will be ignored when saving in the container
  id: string;
  time: number;
  author: string;
  content: string;

  constructor(time: number, author: string, content: string, id?: string) {
    this.time = time;
    this.author = author;
    this.content = content;
    this.id = id || '-1';
  }

  static getHtml(message: iMessage) {
    const parsedMsg = parseMessage(message as unknown as Record<string, unknown>);
    if (!parsedMsg)
      return;

    const timeString = new Date(parsedMsg.time).toLocaleString();

    return (`
      <li>
        [<span class="text-danger">${timeString}</span>]
        <span class="text-primary fw-bold"> ${parsedMsg.author.username}: </span>
        <span class="text-success">${parsedMsg.content}</span>
      </li>
    `);
  }

  static getHtmlList(messages: iMessage[]) {
    let html = '';
    messages.forEach(message => {
      html += Message.getHtml(message) || '';
    });
    return html;
  }
}
