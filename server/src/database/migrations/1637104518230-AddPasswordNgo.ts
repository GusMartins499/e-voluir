import {MigrationInterface, QueryRunner} from "typeorm";

export default class AddPasswordNgo1637104518230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.query("ALTER TABLE ngos add senha varchar NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE ngos DROP COLUMN senha");
    }

}
