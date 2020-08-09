/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

// Esse decorator precisa ir em toda classe que precisa de uma injeção de dependências
@injectable()
class CreateAppointmentService {
  // Aqui foi criada uma variável que já foi declarada nos parâmetros do constructor
  // Só dá pra fazer isso no Typescript, e não no Javascript
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  // só tem um método pq cada service só precisa se preocupar com uma responsabilidade
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This time has already been scheduled.');
    }

    // Agora com a mudança feita o método "create" cria e já salva os dados.
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
