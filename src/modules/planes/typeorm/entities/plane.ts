import { PassengerEntity } from '@modules/passengers/typeorm/entities/passenger';
import { Plane } from '@modules/planes/models/plane';
import { RouteEntity } from '@modules/routes/typeorm/entities/route';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  @ManyToOne(() => RouteEntity, routeEntity => routeEntity.id)
  @JoinColumn()
  route_id: number;

  @OneToMany(() => PassengerEntity, passengerEntity => passengerEntity.plane_id)
  passengers: PassengerEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
