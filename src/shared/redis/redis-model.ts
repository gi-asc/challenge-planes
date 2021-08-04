import redisConfig from './redis-config';
import Redis, { Redis as RedisClient } from 'ioredis';

export default class RedisModel {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(redisConfig.config.redis);
  }

  public async find<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async findKey(pattern: string): Promise<string[]> {
    const key = this.client.keys(pattern);
    return key;
  }
}
