import {MigrationInterface, QueryRunner} from "typeorm";

export class onlineTraining1647514136509 implements MigrationInterface {
    name = 'onlineTraining1647514136509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "given_name" character varying NOT NULL, "family_name" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" uuid NOT NULL, "status" character varying NOT NULL, "userId" uuid, "courseId" uuid, CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_courses_course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_c0795b2733bf088882aa84663cd" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e99d8f99eff1a45a772b11060e" ON "user_courses_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d67262674f71493825eb35e2e2" ON "user_courses_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses_course" ADD CONSTRAINT "FK_e99d8f99eff1a45a772b11060e5" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_courses_course" ADD CONSTRAINT "FK_d67262674f71493825eb35e2e2c" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_courses_course" DROP CONSTRAINT "FK_d67262674f71493825eb35e2e2c"`);
        await queryRunner.query(`ALTER TABLE "user_courses_course" DROP CONSTRAINT "FK_e99d8f99eff1a45a772b11060e5"`);
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04"`);
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d67262674f71493825eb35e2e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e99d8f99eff1a45a772b11060e"`);
        await queryRunner.query(`DROP TABLE "user_courses_course"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
