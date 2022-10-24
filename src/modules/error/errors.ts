import { AbstractError } from './abstract-error';

export class ServerError extends AbstractError {
  constructor(err: string | Error) {
    super(err);
    this.name = 'ServerError';
  }
}

export class ClientError extends AbstractError {
  constructor(err: string | Error) {
    super(err);
    this.name = 'ClientError';
  }
}

export class NotFoundError extends AbstractError {
  constructor(err: string | Error) {
    super(err);
    this.name = 'NotFoundError';
  }
}

export class NullError extends AbstractError {
  constructor(err: string | Error) {
    super(err);
    this.name = 'NullError';
  }
}
