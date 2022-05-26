import * as express from 'express';
import ProductsRouter from './products-router';

// INIT ======================================================================//
const PORT = 8080;
const app = express();
const productsRouter = new ProductsRouter();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/productos', productsRouter.router);
app.use(express.static('public'));

// listen ====================================================================//
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
