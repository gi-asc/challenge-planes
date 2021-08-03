import { Validator } from '@shared/usecases/validator';
import validator from 'validator';

export interface CpfValidator extends Validator {
  cpfValidation(cpf: string): boolean;
}

export class CpfValidatorAdapter implements CpfValidator {
  cpfValidation(cpf: string): boolean {
    if (!validator.isNumeric(cpf) || cpf.length !== 11) {
      return false;
    }
    return true;
  }

  isValid(cpf: string): boolean {
    return this.cpfValidation(cpf);
  }
}
