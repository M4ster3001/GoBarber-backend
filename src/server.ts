/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

console.clear();

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
