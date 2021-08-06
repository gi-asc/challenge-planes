/* eslint-disable prettier/prettier */
import { PassengerRepository } from '@modules/passengers/usecases/passenger-repository';
import { PassportRepository } from '@modules/passports/usecases/passport-repository';
import { Location } from '@shared/location';
import { getCustomRepository } from 'typeorm';
import { PassengerEntity } from '../entities/passenger';
import { DbPassengerRepository } from '../repository/db-passenger-repository';

export class FindPassengersByPlaneIdService {
  async execute(
    plane_id: number
  ): Promise<PassengerEntity[]> {
    const repository = getCustomRepository(DbPassengerRepository)
    const passengers = await repository.find({
      where: {
        plane_id: plane_id
      }
    })

    return passengers
  }
}
