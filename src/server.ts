import 'reflect-metadata';

import express from 'express';
// No arquivo package.json:
// A dependência 'ts-node-dev' faz papel do nodemon e também do typescript
// O comando '--ignore-watch node_modules' serve para ignorar possíveis alterações na node_modules a
// nível de código
// O comando '--transpileOnly' serve apenas para converter o código de ts para js sem se preocupar
// com erros, o vscode cuida disso
// A flag '--inspect' serve para o debug do vscode se conectar à aplicação
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('server started on port 3333!');
});
