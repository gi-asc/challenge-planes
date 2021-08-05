/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PassengerRepository } from '@modules/passengers/usecases/passenger-repository';
import { EntityRepository, Repository } from 'typeorm';
import { PassengerEntity } from '../entities/passenger';

@EntityRepository(PassengerEntity)
// eslint-disable-next-line prettier/prettier
export class DbPassengerRepository
  extends Repository<PassengerEntity>
  implements PassengerRepository {
  async findByPlane(plane_id: number): Promise<PassengerEntity[]> {
    const passengers = await this.find({
      where: {
        plane_id: plane_id
      }
    })
    return passengers
  }
}
