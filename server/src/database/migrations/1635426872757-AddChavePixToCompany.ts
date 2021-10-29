import { MigrationInterface, QueryRunner } from "typeorm";

export default class AddChavePixToCompany1635426872757
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(
      "ALTER TABLE ngos add chave_pix varchar(36) NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE ngos DROP COLUMN chave_pix");
  }
}
