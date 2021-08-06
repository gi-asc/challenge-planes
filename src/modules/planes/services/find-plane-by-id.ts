/* eslint-disable prettier/prettier */
import { PlaneRepository, PlaneRepositoryAdapter } from './find-plane-repository';
import { PlaneEntity } from '../typeorm/entities/plane';
import { getCustomRepository } from 'typeorm';

export interface FindPlaneById {
  find(id: number): Promise<PlaneEntity | undefined>;
}

export class FindPlaneByIdService implements FindPlaneById {
  constructor(private readonly findPlaneRepository: PlaneRepository) { }

  async find(id: number): Promise<PlaneEntity | undefined> {
    const repository = getCustomRepository(PlaneRepositoryAdapter)
    return repository.findOne(id)
  }
}
