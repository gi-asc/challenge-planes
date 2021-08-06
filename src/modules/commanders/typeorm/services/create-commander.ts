import { Commander } from '@modules/commanders/models/commander';
import { getCustomRepository } from 'typeorm';
import { CommanderEntity } from '../entities/commander';
import { DbCommanderRepository } from '../repository/commander-repository';

export class CreateCommanderService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(commander: Commander): Promise<CommanderEntity> {
    const repository = getCustomRepository(DbCommanderRepository);
    const commanderCreates = await repository.createCommander(commander);
    return commanderCreates;
  }
}
