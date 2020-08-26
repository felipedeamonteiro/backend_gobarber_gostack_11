/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

// Rotas precisam estar preocupadas apenas em fazer isso:
//    - Receber requisição;
//    - Chamar outro arquivo;
//    - Devolver uma resposta.

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAutheticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;

/**
 * Tipos diferentes de bancos de dados
 * Postgres => Um banco relacional mais parrudo
 * MongoDB => Banco de Dados não-relacional e serve mais para dados sem relacionamentos (sem migrations)
 * Redis => banco de dados que utiliza (cache, filas, etc)
 */
