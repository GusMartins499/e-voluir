import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
class NGOS {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razao_social: string;

  @Column()
  nome_fantasia: string;

  @Column()
  inscricao_estadual: string;

  @Column()
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  complemento: string;

  @Column()
  cep: string;

  @Column()
  numero: string;

  @Column()
  telefone1: string;

  @Column()
  telefone2: string;

  @Column()
  email: string;

  @Column()
  chave_pix: string;

  @Column()
  bio: string;

  @Column()
  area_atuacao: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default NGOS;