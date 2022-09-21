"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axiosConfig = {
    baseURL: 'http://localhost:8080',
};
const getAllProducts = async () => await axios_1.default.get('/api/productos', { ...axiosConfig });
const getProduct = async (productId) => await axios_1.default.get('/api/productos/' + productId, {
    ...axiosConfig,
});
const deleteProduct = async (productId) => await axios_1.default.delete('/api/productos/' + productId, {
    ...axiosConfig,
});
const deleteAllProducts = async () => await axios_1.default.delete('/api/productos/', {
    ...axiosConfig,
});
const createProduct = async (product) => await axios_1.default.post('/api/productos/', product, {
    ...axiosConfig,
});
const updateProduct = async (productId, data) => await axios_1.default.put(`/api/productos/${productId}`, data, {
    ...axiosConfig,
});
const testWithAxios = async () => {
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
testWithAxios();
