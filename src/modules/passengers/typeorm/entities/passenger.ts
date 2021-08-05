import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Passenger } from '../../models/passenger';
import { Location } from '@shared/location';

@Entity('passengers')
export class PassengerEntity implements Passenger {
  @PrimaryColumn({
    length: 11,
  })
  id: string;

  @Column()
  plane_id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
  })
  spouse_id?: string;

  @Column({
    type: 'json',
  })
  startPoint: Location;

  @Column({
    type: 'json',
  })
  destiny: Location;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
