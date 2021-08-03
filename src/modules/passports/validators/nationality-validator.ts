import { Validator } from '@shared/usecases/validator';

export interface NationalityValidator extends Validator {
  isAcceptedNationality(nationality: string): boolean;
}

export class NationalityValidatorAdapter implements NationalityValidator {
  isAcceptedNationality(nationality: string): boolean {
    const allow = nationality.toLowerCase();
    if (allow === 'brasil') {
      return true;
    }
    return false;
  }

  isValid(nationality: string): boolean {
    return this.isAcceptedNationality(nationality);
  }
}
