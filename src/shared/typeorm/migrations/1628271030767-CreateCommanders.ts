import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCommanders1628271030767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'commanders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commanders');
  }
}
