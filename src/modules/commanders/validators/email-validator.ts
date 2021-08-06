import { Validator } from '@shared/usecases/validator';
import validator from 'validator';

export interface EmailValidator extends Validator {
  isEmail(email: string): boolean;
}

export class EmailValidatorAdapter implements EmailValidator {
  isEmail(email: string): boolean {
    const validation = validator.isEmail(email);
    return validation;
  }
  isValid(email: string): boolean {
    return this.isEmail(email);
  }
}
