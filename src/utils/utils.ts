import fs from 'fs';
import path from 'path';
import { buildSchema, GraphQLSchema } from 'graphql';

export const validateEmail = (email: string) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regex.test(email);
};

export const importGqlSchema = (...schemaPath: string[]): GraphQLSchema => {
  const schemaString = fs.readFileSync(path.join(...schemaPath)).toString();
  const schemaCompiled = buildSchema(schemaString);
  return schemaCompiled;
};
