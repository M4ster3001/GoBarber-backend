/* eslint-disable no-console */
import 'reflect-metadata';
import cors from 'cors'

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';

import routes from './routes';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

console.clear();

const PORT = 3333;

const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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
