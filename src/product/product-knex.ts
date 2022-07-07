import Container from '../containers/container-knex';
import { maridadbOptions } from '../settings/mariadb';
import { iProduct } from '../types';

export const productsTable = new Container<iProduct>(maridadbOptions.connection.database, 'products', maridadbOptions);
productsTable.createTable(table => {
  table.increments('id').primary();
  table.string('name');
  table.integer('price');
  table.string('thumbnail');
  table.string('description');
});

export const parseProduct = (obj: Record<string, unknown> | Partial<iProduct>): iProduct | null => {
  const placeholder = 'https://via.placeholder.com/256';
  const isValidName = typeof obj?.name === 'string' && obj.name.length > 0;
  const isValidPrice = !isNaN(Number(obj?.price)) && Number(obj?.price) > 0;
  const isValidThumbnail = typeof obj?.thumbnail === 'string' && obj?.thumbnail.length > 0;
  const isValidDescription = typeof obj?.description === 'string';

  const name = isValidName ? obj.name as string : null;
  const price = isValidPrice ? Number(obj.price) : null;

  const description = isValidDescription ? obj.description as string : undefined;
  const thumbnail = isValidThumbnail ? obj.thumbnail as string : placeholder;
  const id = typeof obj?.id === 'string' ? obj.id : '-1';

  if (name != null && price != null)
    return { id: id, name, price, thumbnail, description };
  return null;
};
