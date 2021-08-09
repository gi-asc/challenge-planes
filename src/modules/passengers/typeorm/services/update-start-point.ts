/* eslint-disable prettier/prettier */
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { DbPassengerRepository } from '../repository/db-passenger-repository';

export class UpdateStartPointService {
  async execute(
    city: string, newCity: string
  ): Promise<void> {
    const repository = getCustomRepository(DbPassengerRepository)
    await repository.createQueryBuilder('passenger').update().set({
      startPoint: {
        city: newCity
      }
    }).where('passenger.startPoint.city = :city', { city: city })
      .andWhere('passenger.created_at >= :hour', { hour: moment().subtract('1', 'hour').format() })
  }
}
