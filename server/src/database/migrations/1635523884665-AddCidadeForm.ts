import { MigrationInterface, QueryRunner } from "typeorm";

export default class AddCidadeForm1635523884665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query("ALTER TABLE ngos add cidade varchar(20) NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE ngos DROP COLUMN cidade");
  }
}
