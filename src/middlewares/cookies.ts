import express from 'express';

export const resetAge: express.RequestHandler = (req, res, next) => {
  req.session.touch();
  next();
};
