"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseOptions = void 0;
exports.mongooseOptions = {
    uri: "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PWD) +
        '@cluster0.3dem9pw.mongodb.net/?retryWrites=true&w=majority',
    options: { dbName: 'ecommerce' },
};
//# sourceMappingURL=mongoose.js.map