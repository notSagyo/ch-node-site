"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    // Manual ID will be ignored when saving in the container
    id;
    time;
    author;
    content;
    constructor(time, author, content, id) {
        this.time = time;
        this.author = author;
        this.content = content;
        this.id = id || 0;
    }
    static parseMessage(obj) {
        const time = !isNaN(Number(obj?.time)) ? Number(obj.time) : null;
        const author = typeof obj?.author === 'string' && obj?.author ? obj.author : null;
        const content = typeof obj?.content === 'string' && obj?.content.length > 0 ? obj.content : null;
        const id = typeof obj?.id === 'number' ? obj.id : 0;
        if (time != null && author != null && content != null)
            return new Message(time, author, content, id);
        return null;
    }
    static getHtml(message) {
        const parsedMsg = this.parseMessage(message);
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
    static getHtmlList(messages) {
        let html = '';
        messages.forEach(message => {
            html += Message.getHtml(message) || '';
        });
        return html;
    }
}
exports.Message = Message;
