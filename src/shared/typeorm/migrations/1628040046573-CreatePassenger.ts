import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePassenger1628040046573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'passengers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '11',
          },
          {
            name: 'plane_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'spouse_id',
            type: 'varchar',
            length: '11',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'startPoint',
            type: 'JSON',
          },
          {
            name: 'destiny',
            type: 'JSON',
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
    await queryRunner.createForeignKey(
      'passengers',
      new TableForeignKey({
        name: 'cpfPassenger',
        columnNames: ['id'],
        referencedTableName: 'passports',
        referencedColumnNames: ['cpf'],
        onDelete: 'RESTRICT',
      }),
    );
    await queryRunner.createForeignKey(
      'passengers',
      new TableForeignKey({
        name: 'planePassengers',
        columnNames: ['plane_id'],
        referencedTableName: 'planes',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('passengers', 'cpfPassenger');
    await queryRunner.dropForeignKey('passengers', 'planePassengers');
    await queryRunner.dropTable('passengers');
  }
}
