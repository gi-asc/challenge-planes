/* eslint-disable prettier/prettier */
import { FindPlaneRepository, FindPlaneRepositoryAdapter } from './find-plane-repository';
import { PlaneEntity } from '../typeorm/entities/plane';
import { getCustomRepository } from 'typeorm';

export interface FindPlaneForRouteId {
  find(id: number): Promise<PlaneEntity[]>;
}

export class FindPlaneForRouteIdAdapter implements FindPlaneForRouteId {
  constructor(private readonly findPlaneRepository: FindPlaneRepository) { }

  async find(routeId: number): Promise<PlaneEntity[]> {
    const repository = getCustomRepository(FindPlaneRepositoryAdapter)
    return repository.findForRoute(routeId);
  }
}
