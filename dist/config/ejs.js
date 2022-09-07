"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejsDefaultData = void 0;
exports.ejsDefaultData = {
    user: null,
    avatarUrl: '',
    reset: () => {
        exports.ejsDefaultData.user = null;
        exports.ejsDefaultData.avatarUrl = '';
    },
};
