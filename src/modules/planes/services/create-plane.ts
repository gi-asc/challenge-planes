import { DeepPartial, getCustomRepository } from 'typeorm';
import { Plane } from '../models/plane';
import { PlaneEntity } from '../typeorm/entities/plane';
import { PlaneRepositoryAdapter } from './find-plane-repository';

export interface CreatePlane {
  createPlane(plane: DeepPartial<Plane>): Promise<PlaneEntity>;
}

export class CreatePlaneAdapter implements CreatePlane {
  async createPlane(plane: DeepPartial<Plane>): Promise<PlaneEntity> {
    const repository = getCustomRepository(PlaneRepositoryAdapter);
    return repository.createPlane(plane);
  }
}
