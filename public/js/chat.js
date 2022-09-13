/* eslint-disable no-undef */
const socket = io();
console.log('Socket connected');

// ?TODO: Remove duplicated code
// Normalizr schemas
const normalizrAuthorSchema =
  new normalizr.schema.Entity('authors', {  }, { idAttribute: 'email' });
const normalizrMessageSchema =
  new normalizr.schema.Entity('messages', { author: normalizrAuthorSchema, });

// On socket events ==========================================================//
socket.on('messages_updated', (normalizedMessages) => {
  let newMessagesWindowContent = '';
  const messagesWindow = document.getElementById('messagesWindow');
  const compressionRate = document.getElementById('compressionRate');
  const denormalizedMessages = normalizr.denormalize(
    normalizedMessages.result,
    [normalizrMessageSchema],
    normalizedMessages.entities
  );

  denormalizedMessages.forEach((message) => {
    const time = new Date(message.time).toLocaleString();
    const { author: { username, avatar }, content } = message;
    newMessagesWindowContent += `
      <li>
        <img src="${avatar}" width="24" height="24">
        [<span class="text-danger">${time}</span>]
        <span class="text-primary fw-bold"> ${username}: </span>
        <span class="text-success">${content}</span>
      </li>
    `;
  });

  compressionRate && (compressionRate.innerHTML 
    = Math.max(0, getCompressionRate(normalizedMessages, denormalizedMessages)));
  messagesWindow && (messagesWindow.innerHTML = newMessagesWindowContent);
});

// Event listeners ===========================================================//
const messageForm = document.getElementById('messageForm');
const messageContent = document.getElementById('messageContent');
messageForm && messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = {
    time: Date.now(),
    author: {
      age: Number(document.getElementById('messageAuthorAge').value),
      name: document.getElementById('messageAuthorName').value,
      email: document.getElementById('messageAuthorEmail').value ,
      avatar: document.getElementById('messageAuthorAvatar').value,
      lastName: document.getElementById('messageAuthorLastName').value,
      username: document.getElementById('messageAuthorUsername').value
    },
    content: document.getElementById('messageContent').value,
  };

  messageContent && (messageContent.value = '');
  socket.emit('create_message', message);
});

// Helpers ===================================================================//
const getCompressionRate = (normalized, denormalized) => {
  const normalizedSize = JSON.stringify(normalized).length;
  const denormalizedSize = JSON.stringify(denormalized).length;
  const compressionRate = 100 - normalizedSize / denormalizedSize * 100;
  return compressionRate.toFixed(2);
};
