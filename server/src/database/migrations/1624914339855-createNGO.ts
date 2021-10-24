import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class createNGO1624914339855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.createTable(
        new Table({
          name: 'ngos',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'razao_social',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'nome_fantasia',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'inscricao_estadual',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'cnpj',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'endereco',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'bairro',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'complemento',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'cep',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'numero',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'telefone1',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'telefone2',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'bio',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'area_atuacao',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'latitude',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'longitude',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('ngos');
    }

}
