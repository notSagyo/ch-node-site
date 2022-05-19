import * as express from 'express';
import ProductsAPI from './products-api';

// INIT ======================================================================//
const PORT = 8080;
const app = express();
const productsApi = new ProductsAPI();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', productsApi.router);
app.use(express.static('public'));

// listen ====================================================================//
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
