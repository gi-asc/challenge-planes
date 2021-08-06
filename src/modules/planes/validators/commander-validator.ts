import { DbCommanderRepository } from '@modules/commanders/typeorm/repository/commander-repository';
import { Validator } from '@shared/usecases/validator';
import { getCustomRepository } from 'typeorm';

export interface CommanderValidator extends Validator {
  comanderExists(name: string): boolean;
}

export class CommanderValidatorAdapter implements Validator {
  comanderExists(name: string): boolean {
    const repository = getCustomRepository(DbCommanderRepository);
    const exists = repository.findByName(name);
    if (exists == undefined) {
      return false;
    }
    return true;
  }

  isValid(name: string): boolean {
    return this.comanderExists(name);
  }
}
