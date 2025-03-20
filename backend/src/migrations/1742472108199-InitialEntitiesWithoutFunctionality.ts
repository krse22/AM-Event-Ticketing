import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialEntitiesWithoutFunctionality1742472108199 implements MigrationInterface {
    name = 'InitialEntitiesWithoutFunctionality1742472108199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "ticketLimit" integer NOT NULL, "ticketsSold" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "eventId" integer NOT NULL, "cost" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "numberOfTickets" integer NOT NULL, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_user" ("id" SERIAL NOT NULL, "userId" integer, "ticketId" integer, CONSTRAINT "PK_368610dc3312f9b91e9ace40354" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "orderId" integer, "eventId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_e985b82e463cc26f54f68c34681" FOREIGN KEY ("eventId") REFERENCES "event_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_user" ADD CONSTRAINT "FK_58e9c549a787b4e525335a2c7dd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_user" ADD CONSTRAINT "FK_f888f48c50e3e879379eff9507b" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_8f4c2f0a2877e526e8881b51464" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_8f4c2f0a2877e526e8881b51464"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "ticket_user" DROP CONSTRAINT "FK_f888f48c50e3e879379eff9507b"`);
        await queryRunner.query(`ALTER TABLE "ticket_user" DROP CONSTRAINT "FK_58e9c549a787b4e525335a2c7dd"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_e985b82e463cc26f54f68c34681"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "ticket_user"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TABLE "event_entity"`);
    }

}
