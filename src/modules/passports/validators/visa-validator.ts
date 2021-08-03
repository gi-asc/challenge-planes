import { Validator } from '@shared/usecases/validator';

export interface VisaValidator extends Validator {
  visa: string;
  isAcceptedVisa(visas: Array<string>): boolean;
}

export class VisaValidatorAdapter implements VisaValidator {
  visa: 'brasil';

  isAcceptedVisa(visas: Array<string>): boolean {
    return visas.includes(this.visa);
  }

  isValid(visas: Array<string>): boolean {
    return this.isAcceptedVisa(visas);
  }
}
