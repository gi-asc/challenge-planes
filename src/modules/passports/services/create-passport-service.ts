/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Passport } from '../models/passport';
import { PassportRepository } from '../usecases/passport-repository';

export class CreatePassportService {
  constructor(private readonly passportRepository: PassportRepository) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(passport: any): Promise<Passport> {
    return this.passportRepository.addPassport(passport);
  }
}
