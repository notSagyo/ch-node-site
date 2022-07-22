// eslint-disable-next-line no-undef
const socket = io();
console.log('Socket connected');

// On socket events ==========================================================//
socket.on('products_updated', (productList) => {
  if (!productList.length > 0) return;

  let newTableContent = '';
  const productsTable = document.getElementById('productsTable');
  const productsTableBody = document.getElementById('productsTableBody');
  const noProductAlert = document.getElementById('noProductAlert');

  if (!noProductAlert.classList.contains('d-none'))
    noProductAlert.classList.add('d-none');
  productsTable.classList.remove('d-none');

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

  productsTableBody && (productsTableBody.innerHTML =  newTableContent);
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
