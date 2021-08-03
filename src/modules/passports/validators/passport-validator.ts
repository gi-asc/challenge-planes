/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
        return false;
      }
    }
    const { cpf, birthDate, nationality, visa } = passport;

    if (!this.cpfValidator.isValid(cpf)) {
      return false;
    }

    if (!this.birthDateValidator.isValid(birthDate)) {
      return false;
    }

    if (!this.nationalityValidator.isValid(nationality)) {
      return false;
    }

    if (!this.visaValidator.isValid(visa)) {
      return false;
    }
    return true;
  }

  isValid(passport: any): boolean {
    return this.passportValidation(passport)
  }
}
