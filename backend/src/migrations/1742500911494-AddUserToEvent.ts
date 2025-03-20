import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToEvent1742500911494 implements MigrationInterface {
    name = 'AddUserToEvent1742500911494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "event_entity" CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540"`);
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "userId"`);
    }

}
