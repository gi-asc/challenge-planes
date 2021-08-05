import { PassengerEntity } from '../../../passengers/typeorm/entities/passenger';
import { Plane } from '../../models/plane';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planes')
export class PlaneEntity implements Plane {
  @PrimaryColumn()
  id: number;

  @Column()
  commander: string;

  @Column()
  departure_time: Date;

  @Column()
  route_id: number;

  @OneToMany(() => PassengerEntity, passengerEntity => passengerEntity.plane_id)
  passengers: PassengerEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
