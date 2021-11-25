import { Router } from "express";
import { getRepository } from "typeorm";
import NGO from "../models/Ngo";

import authenticated from "../middlewares/authenticated";

import CreateNGOService from "../services/CreateNgoService";
import UpdateNGOService from "../services/UpdateNgoService";

const ngosRouter = Router();

ngosRouter.post("/", async (request, response) => {
  const {
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
  } = request.body.dados;
  const createNGO = new CreateNGOService();
  const ngo = await createNGO.execute({
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
  });

  return response.status(201).json(ngo);
});

ngosRouter.get("/map", authenticated, async (request, response) => {
  const ngoRepository = getRepository(NGO);
  const ngos = await ngoRepository
    .createQueryBuilder("ngos")
    .select([
      "ngos.id",
      "ngos.nome_fantasia",
      "ngos.latitude",
      "ngos.longitude",
    ])
    .getMany();

  return response.status(200).json(ngos);
});

ngosRouter.get("/all", authenticated, async (request, response) => {
  const ngoRepository = getRepository(NGO);
  const ngos = await ngoRepository.find();

  return response.status(200).json(ngos);
});

ngosRouter.get("/filter", authenticated, async (request, response) => {
  const area_atuacao = request.query.atuacao;
  const ngoRepository = getRepository(NGO);
  if (area_atuacao !== "") {
    const ngos = await ngoRepository
      .createQueryBuilder("ngos")
      .select([
        "ngos.nome_fantasia",
        "ngos.area_atuacao",
        "ngos.bio",
        "ngos.telefone1",
        "ngos.id",
      ])
      .where("ngos.area_atuacao = :area_atuacao", { area_atuacao })
      .getMany();

    return response.status(200).json(ngos);
  } else {
    const ngoRepository = getRepository(NGO);
    const ngos = await ngoRepository.find();
    return response.status(200).json(ngos);
  }
});

ngosRouter.get("/account/ngo/:id", authenticated, async (request, response) => {
  const idNgo = request.params.id;
  const ngoRepository = getRepository(NGO);
  const ngo = await ngoRepository.findOne({ id: idNgo });
  delete ngo?.senha;
  
  return response.status(200).json(ngo);
});

ngosRouter.put("/ngo/update/:id", authenticated, async (request, response) => {
  const id = request.params.id;
  const { dados } = request.body;
  const updateNGO = new UpdateNGOService();
  const updatedNgo = await updateNGO.execute({id, dados});

  return response.status(200).json(updatedNgo);
})

export default ngosRouter;
