import express from 'express';

/** Reset cookies' age. */
export const resetAge: express.RequestHandler = (req, res, next) => {
  req.session.touch();
  next();
};
