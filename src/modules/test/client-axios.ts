import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:8080',
};

const getAllProducts = async () =>
  await axios.get('/api/productos', { ...axiosConfig });

const getProduct = async (productId: string) =>
  await axios.get('/api/productos/' + productId, {
    ...axiosConfig,
  });

const deleteProduct = async (productId: string) =>
  await axios.delete('/api/productos/' + productId, {
    ...axiosConfig,
  });

const deleteAllProducts = async () =>
  await axios.delete('/api/productos/', {
    ...axiosConfig,
  });

const createProduct = async (product: Record<string, unknown>) =>
  await axios.post('/api/productos/', product, {
    ...axiosConfig,
  });

const updateProduct = async (productId: string, data: any) =>
  await axios.put(`/api/productos/${productId}`, data, {
    ...axiosConfig,
  });

const runAxiosClient = async () => {
  console.log('\nGeting all products...');
  const productsRes = await getAllProducts();
  console.log('Products:', productsRes.data);

  console.log(`\nGetting product "${productsRes.data[0].id}"...`);
  const productRes = await getProduct(productsRes.data[0].id);
  console.log('Product:', productRes.data);

  console.log(`\nDeleting product "${productsRes.data[0].id}"...`);
  await deleteProduct(productsRes.data[0].id);
  const productsAfterDelete = await getAllProducts();
  console.log('Products after delete:', productsAfterDelete.data);

  console.log('\nDeleting all products...');
  await deleteAllProducts();
  const productsAfterDeleteAll = await getAllProducts();
  console.log('Products after delete all:', productsAfterDeleteAll.data);

  console.log('\nCreating products...');
  await createProduct({ name: 'Axios product 1', price: 420 });
  await createProduct({ name: 'Axios product 2', price: 69 });
  const productsAfterCreate = await getAllProducts();
  console.log('Products after create:', productsAfterCreate.data);

  console.log('\nUpdating products...');
  await updateProduct(productsAfterCreate.data[0].id, {
    name: 'Updated Product',
  });
  const productsAfterUpdate = await getAllProducts();
  console.log('Products after update:', productsAfterUpdate.data);
};

export default runAxiosClient;
