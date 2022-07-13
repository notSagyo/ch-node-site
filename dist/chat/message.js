"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessages = void 0;
var uuid_1 = require("uuid");
var user_1 = require("../models/user");
var parseMessages = function (obj) {
    var author = (0, user_1.parseUser)(obj === null || obj === void 0 ? void 0 : obj.author);
    var time = !isNaN(Number(obj === null || obj === void 0 ? void 0 : obj.time)) ? Number(obj.time) : Date.now();
    var content = typeof (obj === null || obj === void 0 ? void 0 : obj.content) === 'string' && (obj === null || obj === void 0 ? void 0 : obj.content.length) > 0 ? obj.content : '';
    var id = typeof (obj === null || obj === void 0 ? void 0 : obj.id) === 'string' ? obj.id : (0, uuid_1.v4)();
    if (author != null)
        return { id: id, time: time, author: author, content: content };
    return null;
};
exports.parseMessages = parseMessages;
var Messagesssssss = (function () {
    function Messagesssssss(time, author, content, id) {
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
        this.id = id || '-1';
    }
    Object.defineProperty(Messagesssssss, "getHtml", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (message) {
            var parsedMsg = (0, exports.parseMessages)(message);
            if (!parsedMsg)
                return;
            var timeString = new Date(parsedMsg.time).toLocaleString();
            return ("\n      <li>\n        [<span class=\"text-danger\">".concat(timeString, "</span>]\n        <span class=\"text-primary fw-bold\"> ").concat(parsedMsg.author.username, ": </span>\n        <span class=\"text-success\">").concat(parsedMsg.content, "</span>\n      </li>\n    "));
        }
    });
    Object.defineProperty(Messagesssssss, "getHtmlList", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (messages) {
            var html = '';
            messages.forEach(function (message) {
                html += Messagesssssss.getHtml(message) || '';
            });
            return html;
        }
    });
    return Messagesssssss;
}());
exports.default = Messagesssssss;
