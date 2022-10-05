// import express from 'express';
// import { ioServer } from '../app';
// import messageService from '../modules/chat/chat.service';
// import productService from '../modules/product/product.service';
// import { logger } from '../utils/logger';

// let listeningProuctSocket = false;
// export const productSocket: express.RequestHandler = (req, res, next) => {
//   if (listeningProuctSocket) return next();
//   listeningProuctSocket = true;

//   ioServer.on('connection', async (socket) => {
//     logger.info('productSocket: ', req.user);
//     logger.info('New client connected:', socket.id);

//     ioServer.emit('products_updated', await productService.getAllProducts());

//     socket.on('create_product', async (product) => {
//       await productService.createProduct(product);
//       ioServer.emit('products_updated', await productService.getAllProducts());
//     });
//   });

//   next();
// };

// // ?TODO: Replace author for real user
// // * Keeping commented code to make author real user
// let listeningChatSocket = false;
// export const chatSocket: express.RequestHandler = (req, res, next) => {
//   if (listeningChatSocket) return next();
//   listeningChatSocket = true;

//   ioServer.on('connection', async (socket) => {
//     logger.info('New client connected:', socket.id);

//     ioServer.emit('messages_updated', await messageService.getAllMessages());
//     // ioServer.emit('messages_updated', await MessageDao.dao.getAllNormalized());

//     socket.on('create_message', async (message) => {
//       const success = await messageService.createMessage(message);
//       if (!success) return socket.emit('message_error', 'Invalid message');
//       ioServer.emit(
//         'messages_updated',
//         await messageService.getAllMessages(),
//         // await MessageDao.dao.getAllNormalized()
//       );
//     });
//   });

//   next();
// };
