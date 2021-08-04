/* eslint-disable prettier/prettier */
import { Location } from '@shared/location';
import RedisModel from '@shared/redis/redis-model';
import { Route } from '../models/route';
import { FindRoute } from '../usecases/find-route';

export class FindRouteByRedis implements FindRoute {
  constructor(private readonly redisModel: RedisModel) { }

  async find(startPoint: Location, destiny: Location): Promise<Route> {
    const pattern = `*${startPoint.state}*${destiny.state}*`;
    const key = await this.redisModel.findKey(pattern);
    const id = await this.redisModel.find<number>(key[0]);
    if (id === null || undefined) {
      throw new Error('route not found');
    }
    return {
      id: id,
      route: key[0],
    };
  }
}
