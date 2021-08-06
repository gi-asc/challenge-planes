import { Validator } from '@shared/usecases/validator';
import moment from 'moment';

export interface DepartureTimeValidator extends Validator {
  isAfter(date: string): boolean;
}

export class DepartureTimeValidatorAdapter implements DepartureTimeValidator {
  isAfter(date: string): boolean {
    const now = moment().toString();
    if (moment(date).isAfter(now) && moment(date).isValid()) {
      return true;
    }
    return false;
  }

  isValid(date: string): boolean {
    return this.isAfter(date);
  }
}
