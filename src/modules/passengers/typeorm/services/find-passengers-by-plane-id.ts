/* eslint-disable prettier/prettier */
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
