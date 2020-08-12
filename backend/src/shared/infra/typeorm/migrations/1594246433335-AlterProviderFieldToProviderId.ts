import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProviderId1594246433335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.changeColumn('appointments', 'provider',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }));

      await queryRunner.createForeignKey('appointments',
        new TableForeignKey({
          name: 'AppointmentUserFK',
          columnNames: ['provider_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentUserFK');

      await queryRunner.changeColumn('appointments', 'provider_id',
        new TableColumn({
          name: 'provider',
          type: 'varchar',
        })
      )
    }

}
