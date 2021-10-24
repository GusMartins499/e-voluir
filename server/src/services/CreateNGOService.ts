import { getRepository } from 'typeorm';
import NGO from '../models/NGO';

interface Request {
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  cnpj: string;
  endereco: string;
  bairro: string;
  complemento: string;
  cep: string;
  numero: string;
  telefone1: string;
  telefone2: string;
  email: string;
  bio: string;
  area_atuacao: string;
  latitude: string;
  longitude: string;
}

class CreateNGOService {
  public async execute({
    razao_social, nome_fantasia,
    inscricao_estadual, cnpj,
    endereco, bairro, complemento, cep,
    numero, telefone1, telefone2, email,
    bio, area_atuacao, latitude, longitude}: Request): Promise<NGO> {
    const ngoRepository = getRepository(NGO);
    const checkNGO = await ngoRepository.findOne({
      where: { cnpj }
    })
    if (checkNGO) {
      throw new Error('Organização já cadastrada !')
    }

    const Ngo = ngoRepository
    .create({
      razao_social,
      nome_fantasia,
      inscricao_estadual,
      cnpj,
      endereco,
      bairro,
      complemento,
      cep,
      numero,
      telefone1,
      telefone2,
      email,
      bio,
      area_atuacao,
      latitude,
      longitude,
    })
    await ngoRepository.save(Ngo);

    return Ngo;
  }
}

export default CreateNGOService;