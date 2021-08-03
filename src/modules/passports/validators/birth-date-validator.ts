import { Validator } from '@shared/usecases/validator';
import moment from 'moment';

export interface BirthDateValidator extends Validator {
  birthDateValidation(birthDate: string): boolean;
}

export class BirthDateValidatorAdapter implements BirthDateValidator {
  isDate(date: string): boolean {
    return moment(date).isValid();
  }

  birthDateValidation(date: string): boolean {
    const isDate = this.isDate(date);
    const now = moment();
    const birth = moment(date);
    const diff = now.subtract(10, 'years');
    if (isDate && diff.isAfter(birth)) {
      return true;
    }
    return false;
  }

  isValid(date: string): boolean {
    return this.birthDateValidation(date);
  }
}
