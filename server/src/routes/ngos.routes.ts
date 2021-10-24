import { Router } from 'express';
import { getRepository } from 'typeorm';
import NGO from '../models/NGO';

import CreateNGOService from '../services/CreateNGOService';

const ngosRouter = Router();

ngosRouter.post('/', async (request, response) => {
  const {
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
    longitude
  } = request.body.dados;
  const createNGO = new CreateNGOService();
  const ngo = await createNGO.execute({
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
    longitude
  });
  return response.status(201).json(ngo);
});

ngosRouter.get('/map', async (request, response) => {
  const ngoRepository = getRepository(NGO);
  const ngos = await ngoRepository.createQueryBuilder('ngos')
  .select(['ngos.id','ngos.nome_fantasia', 'ngos.latitude', 'ngos.longitude'])
  .getMany()
  return response.status(200).json(ngos);
/*   const ngoRepository = getRepository(NGO);
  const ngos = await ngoRepository.find();
  return response.status(200).json(ngos); */
});

ngosRouter.get('/:id', async (request, response) => {
  const idNgo = request.params.id;
  const ngoRepository = getRepository(NGO);
  const ngo = await ngoRepository.findOne({ id: idNgo });
  return response.status(200).json(ngo); 
});

export default ngosRouter;