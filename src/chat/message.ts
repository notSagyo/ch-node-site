import { v4 } from 'uuid';
import Container from '../containers/container-knex';
import { sqliteOptions } from '../settings/sqlite3';
import { iMessage } from '../types';

export const messagesTable = new Container<Message>('ecommerce', 'messages', sqliteOptions);
messagesTable.createTable(table => {
  table.increments('id').primary();
  table.integer('time');
  table.string('author');
  table.string('content');
});

export const parseMessage = (obj: Record<string, unknown> | Partial<iMessage>): iMessage | null => {
  const time = !isNaN(Number(obj?.time)) ? Number(obj.time) : Date.now();
  const author = typeof obj?.author === 'string' && obj?.author ? obj.author : null;
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

  static getHtml(message: Message) {
    const parsedMsg = parseMessage(message as unknown as Record<string, unknown>);
    if (!parsedMsg)
      return;

    const timeString = new Date(parsedMsg.time).toLocaleString();

    return (`
      <li>
        [<span class="text-danger">${timeString}</span>]
        <span class="text-primary fw-bold"> ${parsedMsg.author}: </span>
        <span class="text-success">${parsedMsg.content}</span>
      </li>
    `);
  }

  static getHtmlList(messages: Message[]) {
    let html = '';
    messages.forEach(message => {
      html += Message.getHtml(message) || '';
    });
    return html;
  }
}
