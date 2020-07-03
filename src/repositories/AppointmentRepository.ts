import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// DTO = Data Transfer Object => Basicamente é a transferência de dados em formato
// de objetos

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentRepository;
