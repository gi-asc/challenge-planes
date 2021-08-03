import { Passport } from '@modules/passports/models/passport';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('passports')
export class PassportEntity implements Passport {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  nationality: string;

  @Column({
    array: true,
  })
  visa: Array<string>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
