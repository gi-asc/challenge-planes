import { PlaneEntity } from '@modules/planes/entities/plane';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Route } from '../../models/route';

@Entity('routes')
export class RouteEntity implements Route {
  @PrimaryColumn()
  id: number;

  @Column()
  route: string;

  @OneToMany(() => PlaneEntity, planeEntity => planeEntity.route_id)
  planes: PlaneEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
