import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'appointments';

export default class AlterProviderFieldToProviderId1604854884142
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(table, 'provider');
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(table, 'AppointmentProvider');

    await queryRunner.dropColumn(table, 'provider_id');

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
