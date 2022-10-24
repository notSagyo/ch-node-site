/**
 * Pensaba implementar custom errors para facilitar el manejo de errores
 * a través de las diferentes capas, pero por cuestiones de tiempo solo
 * se utiliza en el controller de producto.
 */
export abstract class AbstractError extends Error {
  constructor(err: string | Error) {
    if (err instanceof Error) {
      super(err.message);
      this.cause = err.cause;
      this.name = err.name;
      this.message = err.message;
      this.stack = err.stack;
    } else {
      super(err);
    }
  }
}
