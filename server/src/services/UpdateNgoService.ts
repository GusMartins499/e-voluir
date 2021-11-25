import { getRepository } from "typeorm";
import NGO from "../models/Ngo";

interface Request {
  id: string;
  dados: {
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
    chave_pix: string;
    bio: string;
    area_atuacao: string;
    latitude: string;
    longitude: string;
  }
}

class UpdateNGOService {
  public async execute({id, dados}: Request): Promise<NGO> {
    const ngoRepository = getRepository(NGO);
    const ngo = await ngoRepository.findOne({ id });
    const updatedNgo = Object.assign(ngo, {...dados});
    await ngoRepository.save(updatedNgo);
    
    return updatedNgo;
  }
}

export default UpdateNGOService;
