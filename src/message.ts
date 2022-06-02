export class Message {
  // Manual ID will be ignored when saving in the container
  id: number;
  time: number;
  author: string;
  content: string;

  constructor(time: number, author: string, content: string, id?: number) {
    this.time = time;
    this.author = author;
    this.content = content;
    this.id = id || 0;
  }

  static parseMessage(obj: Record<string, unknown>) {
    const time = !isNaN(Number(obj?.time)) ? Number(obj.time) : null;
    const author = typeof obj?.author === 'string' && obj?.author ? obj.author : null;
    const content = typeof obj?.content === 'string' && obj?.content.length > 0 ? obj.content : null;
    const id = typeof obj?.id === 'number' ? obj.id : 0;

    if (time != null && author != null && content != null)
      return new Message(time, author, content, id);
    return null;
  }

  static getHtml(message: Message) {
    const parsedMsg = this.parseMessage(message as unknown as Record<string, unknown>);
    if (!parsedMsg)
      return;

    const time = new Date(parsedMsg.time);
    const timeString = `${time.getFullYear()}`
      + `/${time.getMonth()}`
      + `/${time.getDay()}`
      + ` ${time.getHours().toString().padStart(2, '0')}:`
      + `${time.getMinutes().toString().padEnd(2, '0')}:`;

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
