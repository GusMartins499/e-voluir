import { getRepository } from "typeorm";
import { hash } from 'bcryptjs';
import NGO from "../models/Ngo";

import AppError from "../erros/AppError";

interface Request {
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  bairro: string;
  complemento: string;
  cep: string;
  numero: string;
  telefone1: string;
  telefone2: string;
  email: string;
  senha: string;
  chave_pix: string;
  bio: string;
  area_atuacao: string;
  latitude: string;
  longitude: string;
}

class CreateNGOService {
  public async execute({
    razao_social,
    nome_fantasia,
    inscricao_estadual,
    cnpj,
    endereco,
    cidade,
    bairro,
    complemento,
    cep,
    numero,
    telefone1,
    telefone2,
    email,
    senha,
    chave_pix,
    bio,
    area_atuacao,
    latitude,
    longitude,
  }: Request): Promise<NGO> {
    const ngoRepository = getRepository(NGO);
    const checkNGO = await ngoRepository.findOne({
      where: { cnpj },
    });
    if (checkNGO) {
      throw new AppError("Organization already exists", 410);
    }

    const hashPassword = await hash(senha, 8);
    const Ngo = ngoRepository.create({
      razao_social,
      nome_fantasia,
      inscricao_estadual,
      cnpj,
      endereco,
      cidade,
      bairro,
      complemento,
      cep,
      numero,
      telefone1,
      telefone2,
      email,
      senha: hashPassword,
      chave_pix,
      bio,
      area_atuacao,
      latitude,
      longitude,
    });
    await ngoRepository.save(Ngo);

    return Ngo;
  }
}

export default CreateNGOService;
