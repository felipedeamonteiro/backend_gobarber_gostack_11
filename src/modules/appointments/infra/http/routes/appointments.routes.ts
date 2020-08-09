/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ApppointmentsController from '../controllers/AppointmentsController';

// Rotas precisam estar preocupadas apenas em fazer isso:
//    - Receber requisição;
//    - Chamar outro arquivo;
//    - Devolver uma resposta.

const appointmentRouter = Router();
const appointmentsController = new ApppointmentsController();

appointmentRouter.use(ensureAutheticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
