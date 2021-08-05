/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { PlaneEntity } from '../typeorm/entities/plane';
export interface FindPlaneRepository {
  findForRoute(routeId: number): Promise<PlaneEntity[]>;
}

@EntityRepository(PlaneEntity)
export class FindPlaneRepositoryAdapter
  extends Repository<PlaneEntity>
  implements FindPlaneRepository {
  async findForRoute(route_id: number): Promise<PlaneEntity[]> {
    const planes = await this.find({
      where: {
        route_id: route_id,
      },
    });

    return planes;
  }
}
