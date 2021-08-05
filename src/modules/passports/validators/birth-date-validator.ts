import { Validator } from '@shared/usecases/validator';

export interface BirthDateValidator extends Validator {
  birthDateValidation(birthDate: string): boolean;
}

export class BirthDateValidatorAdapter implements BirthDateValidator {
  birthDateValidation(date: string): boolean {
    const birth = new Date(date);
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365));
    if (diffDays >= 10) {
      return true;
    }
    return false;
  }

  isValid(date: string): boolean {
    return this.birthDateValidation(date);
  }
}
