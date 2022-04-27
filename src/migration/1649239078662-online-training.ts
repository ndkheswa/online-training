import {MigrationInterface, QueryRunner} from "typeorm";

export class onlineTraining1649239078662 implements MigrationInterface {
    name = 'onlineTraining1649239078662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public_file" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "duration" character varying NOT NULL, "fileId" integer, "sectionId" uuid, CONSTRAINT "REL_e3889f6cc026acff6872aeeddb" UNIQUE ("fileId"), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "user_role"`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_c61e35b7deed3caab17e821144a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_e3889f6cc026acff6872aeeddbb" FOREIGN KEY ("fileId") REFERENCES "public_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_a601ba853da964dde8a44696cfe" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_a601ba853da964dde8a44696cfe"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_e3889f6cc026acff6872aeeddbb"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_c61e35b7deed3caab17e821144a"`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "user_role" DROP `);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "public_file"`);
    }

}
