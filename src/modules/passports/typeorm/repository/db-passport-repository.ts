/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Passport } from '@modules/passports/models/passport';
import { CreatePassport } from '@modules/passports/usecases/create-passport';
import { PassportRepository } from '@modules/passports/usecases/passport-repository';
import { EntityRepository, Repository } from 'typeorm';
import { PassportEntity } from '../entities/passport';

@EntityRepository(PassportEntity)
// eslint-disable-next-line prettier/prettier
export class DbPassportRepository
  extends Repository<PassportEntity>
  implements PassportRepository {
  constructor(private readonly createPassport: CreatePassport) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addPassport(passport: any): Promise<Passport> {
    const passportOk = this.createPassport.create(passport);
    return this.save(passportOk);
  }
}
