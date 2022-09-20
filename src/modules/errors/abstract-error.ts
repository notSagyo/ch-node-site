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
