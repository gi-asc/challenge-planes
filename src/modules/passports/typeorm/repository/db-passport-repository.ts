/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Passport } from '@modules/passports/models/passport';
import { PassportRepository } from '@modules/passports/usecases/passport-repository';
import { EntityRepository, Repository } from 'typeorm';
import { PassportEntity } from '../entities/passport';

@EntityRepository(PassportEntity)
// eslint-disable-next-line prettier/prettier
export class DbPassportRepository
  extends Repository<PassportEntity>
  implements PassportRepository {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addPassport(passport: Passport): Promise<PassportEntity> {
    const saves = this.create(passport)
    const ok = await this.save(saves)
    return ok
  }
}
