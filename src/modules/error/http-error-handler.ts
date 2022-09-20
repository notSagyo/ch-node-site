import { Response } from 'express';
import { logger } from '../../utils/logger';
import { ClientError, NotFoundError, NullError, ServerError } from './errors';

export class HttpErrorHandler {
  res: Response;
  defaultData?: unknown;

  constructor(res: Response, defaultData: unknown = '') {
    this.res = res;
    this.defaultData = defaultData;
  }

  handleError(err: Error, data = this.defaultData, statusCode?: number) {
    let status = 418;
    let message = '';
    let resMessage = '';

    if (statusCode != null) status = statusCode;
    else if (err instanceof ClientError) status = 400;
    else if (err instanceof ServerError) status = 500;
    else if (err instanceof NullError) status = 400;
    else if (err instanceof NotFoundError) status = 404;
    else err.name = 'Unknown Error';

    message = `[${status}: ${err.name}] ${err.message}`;
    resMessage = `${message} ${data ? JSON.stringify(data) : ''}`;

    logger.error(message, data);
    return { send: () => this.res.status(status).send(resMessage) };
  }
}
