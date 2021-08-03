/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AppError from '@shared/errors/AppError';
import { Passport } from '../models/passport';
import { PassportValidator } from '../validators';

export class CreatePassport {
  constructor(private readonly passportValidator: PassportValidator) { }
  create(passport: any): Passport {
    const isValid = this.passportValidator.isValid(passport);
    if (!isValid) {
      throw new AppError('Invalid Passport', 400);
    }
    return {
      cpf: passport.cpf,
      name: passport.name,
      birthDate: new Date(passport.birthDate),
      nationality: passport.nationality,
      visa: passport.visa,
    };
  }
}
