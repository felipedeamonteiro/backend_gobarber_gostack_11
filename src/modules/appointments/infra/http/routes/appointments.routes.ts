/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Rotas precisam estar preocupadas apenas em fazer isso:
//    - Receber requisição;
//    - Chamar outro arquivo;
//    - Devolver uma resposta.

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.use(ensureAutheticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
