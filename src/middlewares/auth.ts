import * as express from 'express';

// Authentication
export const authn: express.RequestHandler = (req: any, res, next) => {
  req.user = {
    fullName: 'John Doe',
    isAdmin: true
  };
  next();
};

// Authorization
export const authz: express.RequestHandler = (req: any, res, next) => {
  if (req.user.isAdmin) next();
  else res.status(403).send('403: Forbidden, must be and admin');
};
