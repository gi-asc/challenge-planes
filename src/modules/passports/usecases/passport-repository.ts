/* eslint-disable @typescript-eslint/no-explicit-any */
import { Passport } from '../models/passport';

export interface PassportRepository {
  addPassport(passport: any): Promise<Passport>;
}
