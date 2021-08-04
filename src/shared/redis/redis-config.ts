import { RedisOptions } from 'ioredis';

interface IRedisConfig {
  config: {
    redis: RedisOptions;
  };
  drive: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  drive: 'redis',
} as IRedisConfig;
