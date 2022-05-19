const placeholder = 'https://via.placeholder.com/256';

export class Product {
  // Manual ID will be ignored when saving in the container
  id: number;
  name: string;
  price: number;
  thumbnail: string;

  constructor(name: string, price: number, thumbnail?: string, id?: number) {
    this.name = name;
    this.price = price;
    this.thumbnail = thumbnail || placeholder;
    this.id = id || 0;
  }

  static parseProduct(obj: Record<string, unknown>) {
    const isValidPrice = !isNaN(Number(obj?.price)) && Number(obj?.price) > 0;

    const name = typeof obj?.name === 'string' && obj?.name ? obj.name : null;
    const price = isValidPrice ? Number(obj.price) : null;
    const thumbnail = typeof obj?.thumbnail === 'string' ? obj.thumbnail : placeholder;
    const id = typeof obj?.id === 'number' ? obj.id : 0;
    if (name != null && price != null)
      return new Product(name, price, thumbnail, id);
    return null;
  }
}
