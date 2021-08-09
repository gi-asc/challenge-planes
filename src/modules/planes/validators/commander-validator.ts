import { DbCommanderRepository } from '@modules/commanders/typeorm/repository/commander-repository';
import { Validator } from '@shared/usecases/validator';
import { getCustomRepository } from 'typeorm';

export interface CommanderValidator {
  comanderExists(name: string): Promise<boolean>;
  isValid(name: string): Promise<boolean>;
}

export class CommanderValidatorAdapter implements CommanderValidator {
  async comanderExists(name: string): Promise<boolean> {
    const repository = getCustomRepository(DbCommanderRepository);
    const exists = await repository.findByName(name);
    if (exists == undefined || !exists) {
      return false;
    }
    return true;
  }

  async isValid(name: string): Promise<boolean> {
    const valid = this.comanderExists(name);
    return valid;
  }
}
