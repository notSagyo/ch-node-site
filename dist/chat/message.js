"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesTable = void 0;
var container_knex_1 = require("../containers/container-knex");
var sqlite3_1 = require("../settings/sqlite3");
exports.messagesTable = new container_knex_1.default('ecommerce', 'messages', sqlite3_1.options);
exports.messagesTable.createTable(function (table) {
    table.increments('id').primary();
    table.integer('time');
    table.string('author');
    table.string('content');
});
var Message = /** @class */ (function () {
    function Message(time, author, content, id) {
        // Manual ID will be ignored when saving in the container
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "author", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.time = time;
        this.author = author;
        this.content = content;
        this.id = id || 0;
    }
    Object.defineProperty(Message, "parseMessage", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (obj) {
            var time = !isNaN(Number(obj === null || obj === void 0 ? void 0 : obj.time)) ? Number(obj.time) : null;
            var author = typeof (obj === null || obj === void 0 ? void 0 : obj.author) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.author) ? obj.author : null;
            var content = typeof (obj === null || obj === void 0 ? void 0 : obj.content) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.content.length) > 0 ? obj.content : null;
            var id = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'number' ? obj.id : 0;
            if (time != null && author != null && content != null)
                return new Message(time, author, content, id);
            return null;
        }
    });
    Object.defineProperty(Message, "getHtml", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var parsedMsg = this.parseMessage(message);
            if (!parsedMsg)
                return;
            var timeString = new Date(parsedMsg.time).toLocaleString();
            return ("\n      <li>\n        [<span class=\"text-danger\">".concat(timeString, "</span>]\n        <span class=\"text-primary fw-bold\"> ").concat(parsedMsg.author, ": </span>\n        <span class=\"text-success\">").concat(parsedMsg.content, "</span>\n      </li>\n    "));
        }
    });
    Object.defineProperty(Message, "getHtmlList", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (messages) {
            var html = '';
            messages.forEach(function (message) {
                html += Message.getHtml(message) || '';
            });
            return html;
        }
    });
    return Message;
}());
exports.default = Message;
