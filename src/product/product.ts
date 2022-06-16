import Container from '../container-knex';
import { options } from '../settings/mariadb';

export const productsTable = new Container<Product>(options.connection.database, 'messages', options);
productsTable.createTable(table => {
  table.increments('id').primary();
  table.string('name');
  table.integer('price');
  table.string('thumbnail');
  table.string('description');
});

const placeholder = 'https://via.placeholder.com/256';
export default class Product {
  // Manual ID input will be ignored when saved in the container
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;

  constructor(name: string, price: number, description?: string, thumbnail?: string, id?: number) {
    this.name = name;
    this.price = price;

    this.description = description || '';
    this.thumbnail = thumbnail || placeholder;
    this.id = id || 0;
  }

  static parseProduct(obj: Record<string, unknown> | Product) {
    const isValidName = typeof obj?.name === 'string' && obj.name.length > 0;
    const isValidPrice = !isNaN(Number(obj?.price)) && Number(obj?.price) > 0;
    const isValidThumbnail = typeof obj?.thumbnail === 'string' && obj?.thumbnail.length > 0;
    const isValidDescription = typeof obj?.description === 'string';

    const name = isValidName ? obj.name as string : null;
    const price = isValidPrice ? Number(obj.price) : null;

    const description = isValidDescription ? obj.description as string : undefined;
    const thumbnail = isValidThumbnail ? obj.thumbnail as string : undefined;
    const id = typeof obj?.id === 'number' ? obj.id : undefined;

    if (name != null && price != null)
      return new Product(name, price, description, thumbnail, id);
    return null;
  }
}
