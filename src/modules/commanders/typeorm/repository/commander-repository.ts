/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Commander } from '@modules/commanders/models/commander';
import AppError from '@shared/errors/AppError';
import { EntityRepository, Repository } from 'typeorm';
import { CommanderEntity } from '../entities/commander';

@EntityRepository(CommanderEntity)
// eslint-disable-next-line prettier/prettier
export class DbCommanderRepository
  extends Repository<CommanderEntity>
{
  async findById(id: number): Promise<CommanderEntity | undefined> {
    const commander = await this.findOne(id)
    return commander
  }

  async findByName(name: string): Promise<CommanderEntity | undefined> {
    const commander = await this.findOne({
      where: {
        name: name
      }
    })
    return commander
  }

  async createCommander(commander: Commander): Promise<CommanderEntity> {
    const withName = this.findByName(commander.name)
    if (withName != undefined) {
      throw new AppError("existing commander")
    }
    const commanderCreate = this.create(commander)
    const newCommander = await this.save(commanderCreate)
    return newCommander
  }
}
