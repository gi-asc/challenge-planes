import { EntityRepository, Repository } from 'typeorm';
import { RouteEntity } from '../entities/route';

@EntityRepository(RouteEntity)
// eslint-disable-next-line prettier/prettier
export class DbRouteRepository
  extends Repository<RouteEntity>
{
  async findById(id: number): Promise<RouteEntity | undefined> {
    const route = await this.findOne(id);
    return route;
  }
}
