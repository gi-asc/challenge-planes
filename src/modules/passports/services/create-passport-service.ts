/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getCustomRepository } from 'typeorm';
import { Passport } from '../models/passport';
import { DbPassportRepository } from '../typeorm/repository/db-passport-repository';

export class CreatePassportService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(passport: any): Promise<Passport> {
    const repository = await getCustomRepository(DbPassportRepository)
    const pass = repository.addPassport(passport)
    return pass
  }
}
