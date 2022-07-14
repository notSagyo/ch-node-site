import express from 'express';

// Authentication
// TODO: update to work with session
export const authn: express.RequestHandler = (req, res, next) => {
  req.session.user = {
    fullName: 'John Doe',
    isAdmin: true
  };
  next();
};

// Authorization
export const authz: express.RequestHandler = (req, res, next) => {
  if (req.session.isAdmin) next();
  else res.status(403).send('403: Forbidden, must be and admin');
};
