/* eslint-disable prettier/prettier */
import { Between, DeepPartial, EntityRepository, Repository } from 'typeorm';
import { Plane } from '../models/plane';
import { PlaneEntity } from '../typeorm/entities/plane';
export interface PlaneRepository {
  findForRoute(routeId: number): Promise<PlaneEntity[]>;
}

@EntityRepository(PlaneEntity)
export class PlaneRepositoryAdapter
  extends Repository<PlaneEntity>
  implements PlaneRepository {
  async findForRoute(route_id: number): Promise<PlaneEntity[]> {
    const planes = await this.find({
      where: {
        route_id: route_id,
      },
    });

    return planes;
  }

  async createPlane(plane: DeepPartial<Plane>): Promise<PlaneEntity> {
    const planes = this.create(plane)
    const saves = await this.save(planes)
    return saves
  }

  async findByDeparture(departure_init: string, departure_final: string): Promise<PlaneEntity[]> {
    const planes = await this.find({
      departure_time: Between(departure_init, departure_final
      )
    });
    return planes
  }
}
