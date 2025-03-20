import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToOrder1742478611273 implements MigrationInterface {
    name = 'AddUserToOrder1742478611273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "userId"`);
    }

}
