import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddColumnTypeTransaction1600685411725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('transactions',new TableColumn({
            name: 'type',
            type:'varchar',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transactions','type');
    }

}
