import { PassengerEntity } from '../typeorm/entities/passenger';

export interface PassengerRepository {
  findByPlane(plane_id: number): Promise<PassengerEntity[]>;
}
