import Product from './product';

export default class CartProduct extends Product {
  quantity: number;
  timestamp: number;
  code: string;

  constructor(
    name: string,
    price: number,
    quantity?: number,
    timestamp?: number,
    code?: string,
    description?: string,
    thumbnail?: string,
    id?: number) {

    super(name, price, description, thumbnail, id);
    this.quantity = quantity || 1;
    this.timestamp = timestamp || Date.now();
    // TODO: Replace with uuidv4
    this.code = code || (Math.random()*1000000).toFixed(0);
  }

  static parseProduct(obj: Record<string, unknown> | CartProduct | Product) {
    const parsedProd = Product.parseProduct(obj);
    if (!parsedProd)
      return null;

    // TS assertion because not not all params have the same signature
    obj = obj as Record<string, unknown>;

    const isValidQuantity = typeof obj?.quantity === 'number' && obj.quantity > 0;
    const isValidTimestamp = typeof obj?.timestamp === 'number' && obj.timestamp > 0;
    const isValidCode = typeof obj?.code === 'string' && obj.code.length > 0;

    const quantity = isValidQuantity ? obj.quantity as number : undefined;
    const timestamp = isValidTimestamp ? obj.timestamp as number : undefined;
    const code = isValidCode ? obj.code as string : undefined;

    return new CartProduct(
      parsedProd.name,
      parsedProd.price,
      quantity,
      timestamp,
      code,
      parsedProd.description,
      parsedProd.thumbnail,
      parsedProd.id
    );
  }
}
