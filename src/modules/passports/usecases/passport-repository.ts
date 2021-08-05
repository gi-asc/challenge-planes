/* eslint-disable @typescript-eslint/no-explicit-any */
import { Passport } from '../models/passport';
import { PassportEntity } from '../typeorm/entities/passport';

export interface PassportRepository {
  addPassport(passport: Passport): Promise<PassportEntity>;
}
