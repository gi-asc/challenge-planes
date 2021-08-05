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
      host: 'localhost',
      port: 6379,
      password: '',
    },
  },
  drive: 'redis',
} as IRedisConfig;
