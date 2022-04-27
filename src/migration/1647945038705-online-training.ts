import {MigrationInterface, QueryRunner} from "typeorm";

export class onlineTraining1647945038705 implements MigrationInterface {
    name = 'onlineTraining1647945038705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
    }

}
