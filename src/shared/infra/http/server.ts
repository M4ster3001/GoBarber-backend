/* eslint-disable no-console */
import 'reflect-metadata';
import cors from 'cors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import morgan from 'morgan';
import routes from './routes';

import '@shared/container/index';
import rateLimiter from './middlewares/rateLimiter';

console.clear();

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
