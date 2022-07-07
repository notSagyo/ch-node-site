import * as path from 'path';

export const options = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../db/ecommerce.sqlite3'),
  },
  useNullAsDefault: true
};
