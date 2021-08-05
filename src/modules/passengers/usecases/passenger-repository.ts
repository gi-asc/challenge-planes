import { Repository } from 'typeorm';
import { PassengerEntity } from '../typeorm/entities/passenger';

export interface PassengerRepository extends Repository<PassengerEntity> {
  findByPlane(plane_id: number): Promise<PassengerEntity[]>;
}
