/* eslint-disable prettier/prettier */
import { PassengerRepository } from '@modules/passengers/usecases/passenger-repository';
import { PassportRepository } from '@modules/passports/usecases/passport-repository';
import { Location } from '@shared/location';
import { getCustomRepository } from 'typeorm';
import { PassengerEntity } from '../entities/passenger';
import { DbPassengerRepository } from '../repository/db-passenger-repository';

export class CreatePassengerService {
  constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly passportRepository: PassportRepository,
  ) { }

  async execute(
    cpf: string,
    plane_id: number,
    startPoint: Location,
    destiny: Location,
    spouse_id = undefined,
  ): Promise<PassengerEntity> {
    const repository = getCustomRepository(DbPassengerRepository)
    const passenger = repository.create({
      id: cpf,
      plane_id: plane_id,
      startPoint: startPoint,
      destiny: destiny,
    });

    if (spouse_id !== undefined) {
      passenger.spouse_id = spouse_id;
    }

    return repository.save(passenger);
  }
}
