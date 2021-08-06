/* eslint-disable prettier/prettier */
import { PlaneRepository, PlaneRepositoryAdapter } from './find-plane-repository';
import { PlaneEntity } from '../typeorm/entities/plane';
import { getCustomRepository } from 'typeorm';

export interface FindPlaneForRouteId {
  find(id: number): Promise<PlaneEntity[]>;
}

export class FindPlaneForRouteIdAdapter implements FindPlaneForRouteId {
  constructor(private readonly findPlaneRepository: PlaneRepository) { }

  async find(routeId: number): Promise<PlaneEntity[]> {
    const repository = getCustomRepository(PlaneRepositoryAdapter)
    return repository.findForRoute(routeId);
  }
}
