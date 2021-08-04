/* eslint-disable prettier/prettier */
import { FindPlaneRepository } from './find-plane-repository';
import { PlaneEntity } from '../typeorm/entities/plane';

export interface FindPlaneForRouteId {
  find(id: number): Promise<PlaneEntity[]>;
}

export class FindPlaneForRouteIdAdapter implements FindPlaneForRouteId {
  constructor(private readonly findPlaneRepository: FindPlaneRepository) { }

  async find(routeId: number): Promise<PlaneEntity[]> {
    return this.findPlaneRepository.findForRoute(routeId);
  }
}
