/* eslint-disable prettier/prettier */
import { PlaneRepository, PlaneRepositoryAdapter } from './find-plane-repository';
import { PlaneEntity } from '../typeorm/entities/plane';
import { getCustomRepository } from 'typeorm';

export interface FindPlaneByDeparture {
  execute(departure_init: string, departure_final: string): Promise<PlaneEntity[] | undefined>;
}

export class FindPlaneByDepartureService implements FindPlaneByDeparture {
  constructor(private readonly findPlaneRepository: PlaneRepository) { }

  async execute(departure_init: string, departure_final: string): Promise<PlaneEntity[] | undefined> {
    const repository = getCustomRepository(PlaneRepositoryAdapter)
    return repository.findByDeparture(departure_init, departure_final)
  }
}
