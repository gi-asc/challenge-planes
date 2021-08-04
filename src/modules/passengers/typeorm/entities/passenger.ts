import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Passenger } from '@modules/passengers/models/passenger';
import { PassportEntity } from '@modules/passports/typeorm/entities/passport';
import { PlaneEntity } from '@modules/planes/typeorm/entities/plane';
import { Location } from '@shared/location';

@Entity('passengers')
export class PassengerEntity implements Passenger {
  @PrimaryColumn({
    length: 11,
  })
  @OneToOne(() => PassportEntity, passportEntity => passportEntity.cpf, {
    cascade: true,
  })
  @JoinColumn()
  id: string;

  @ManyToOne(() => PlaneEntity, planeEntity => planeEntity.id)
  @JoinColumn()
  plane_id: number;

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
