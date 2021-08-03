import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePassports1628026430113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'passports',
        columns: [
          {
            name: 'cpf',
            type: 'varchar',
            isPrimary: true,
            length: '11',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('passports');
  }
}
