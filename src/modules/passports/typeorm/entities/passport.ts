import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('passports')
export class PassportEntity {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  nationality: string;

  @Column({
    type: 'varchar',
    array: true,
  })
  visa: Array<string>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
