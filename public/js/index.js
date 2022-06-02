/* eslint-disable no-undef */
const socket = io();
console.log('Socket connected');

// On socket events ==========================================================//
socket.on('products_updated', (productList) => {
  const productsTable = document.getElementById('productsTable');
  const productsTableBody = document.getElementById('productsTableBody');
  const noProductAlert = document.getElementById('noProductAlert');
  if (!noProductAlert.classList.contains('d-none'))
    noProductAlert.classList.add('d-none');
  productsTable.classList.remove('d-none');
  let newTableContent = '';

  productList.forEach((product) => {
    newTableContent += `
    <tr class="text-capitalize">
      <th>${product.id}</th>
      <td><img src="${product.thumbnail}" alt="${product.name}" class="img-fluid" width="32" /></td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
    </tr>
    `;
  });

  productsTableBody.innerHTML =  newTableContent;
});

socket.on('messages_updated', (messageList) => {
  const messagesWindow = document.getElementById('messagesWindow');
  let newMessagesWindowContent = '';

  messageList.forEach((message) => {
    const time = new Date(message.time);
    const timeString = `${time.getDay()}`
      + `/${time.getMonth()}`
      + `/${time.getFullYear()}`
      + ` ${time.getHours().toString().padStart(2, 0)}:`
      + `${time.getMinutes().toString().padEnd(2, 0)}`;

    newMessagesWindowContent += `
      <li>
        [<span class="text-danger">${timeString}</span>]
        <span class="text-primary fw-bold"> ${message.author}: </span>
        <span class="text-success">${message.content}</span>
      </li>
    `;
  });

  messagesWindow.innerHTML = newMessagesWindowContent;
});

// Event listeners ===========================================================//
const productForm = document.getElementById('productForm');
productForm && productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const product = {
    name: document.getElementById('productNameInput').value,
    price: document.getElementById('productPriceInput').value,
    thumbnail: document.getElementById('productThumbnailInput').value,
  };
  socket.emit('create_product', product);
});

const messageForm = document.getElementById('messageForm');
const messageContent = document.getElementById('messageContent');
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = {
    time: Date.now(),
    author: document.getElementById('messageEmail').value,
    content: document.getElementById('messageContent').value,
  };
  messageContent && (messageContent.value = '');
  socket.emit('create_message', message);
});
