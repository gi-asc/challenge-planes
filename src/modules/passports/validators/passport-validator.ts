/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '@shared/errors/AppError';
import { Validator } from '@shared/usecases/validator';
import {
  BirthDateValidator,
  CpfValidator,
  VisaValidator,
  NationalityValidator,
} from './index';

export interface PassportValidator extends Validator {
  passportValidation(passport: any): boolean;
}

export class PassportValidatorAdapter implements PassportValidator {
  constructor(
    private readonly cpfValidator: CpfValidator,
    private readonly birthDateValidator: BirthDateValidator,
    private readonly visaValidator: VisaValidator,
    private readonly nationalityValidator: NationalityValidator,
  ) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  passportValidation(passport: any): boolean {
    const fields = ['name', 'cpf', 'birthDate', 'nationality', 'visa'];
    for (const field of fields) {
      if (!passport[field]) {
        throw new AppError(`missing ${field}`);
      }
    }
    const { cpf, birthDate, nationality, visa } = passport;

    if (!this.cpfValidator.isValid(cpf)) {
      throw new AppError('invalid cpf');
    }

    if (!this.birthDateValidator.isValid(birthDate)) {
      throw new AppError('invalid birthDate');
    }

    if (!this.nationalityValidator.isValid(nationality)) {
      throw new AppError('invalid nationality');
    }

    if (!this.visaValidator.isValid(visa)) {
      throw new AppError('invalid visa');
    }
    return true;
  }

  isValid(passport: any): boolean {
    return this.passportValidation(passport)
  }
}
