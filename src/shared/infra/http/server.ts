import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

// No arquivo package.json:
// A dependência 'ts-node-dev' faz papel do nodemon e também do typescript
// O comando '--ignore-watch node_modules' serve para ignorar possíveis alterações na node_modules a
// nível de código
// O comando '--transpileOnly' serve apenas para converter o código de ts para js sem se preocupar
// com erros, o vscode cuida disso
// A flag '--inspect' serve para o debug do vscode se conectar à aplicação
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

/**
 * Este último app (que é um middleware de erros) precisa vir depois das rotas,
 * pois ele irá tratar dos erros das rotas. O 'if' serve para tratar dos erros
 * conhecidos/esperados, o console.err é para rastrear o erro e o return vem com
 * um erro não esperado. E para os erros cairem aqui neste middleware é necessário
 * addicionar um pacote chamado express-async-errors, pois sem ele o node não trata
 * os errors sem o try/catch que foram removidos dos códigos de rotas
 */

/**
 * Aqui onde tem o "_" como variável de recebimento da function (que era para ser um "next"),
 * o es-lint dava erro de minhoquinha, mas foi colocado a regra "@typescript-eslint/no-unused-vars"...
 * para que o es-lint não ficasse reclamando
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
