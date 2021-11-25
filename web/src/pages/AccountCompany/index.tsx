import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ptForm } from "yup-locale-pt";
import * as yup from "yup";

import api from "../../services/api";

import mapIcon from "../../utils/mapIcon";
import warningIcon from "../../assets/icons/warning.svg";

import styles from "./styles.module.scss";

import InputForm from "../../components/InputForm";
import Header from "../../components/HeaderFormCompany";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import { notifyError, notifySuccess, notifyWarn } from "../../components/Toast";

import { useLocationUser } from "../../context/UserLocation";
import { useAuth } from "../../context/auth";

interface dataForm {
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  cnpj: string;
  cidade: string;
  endereco: string;
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

yup.setLocale(ptForm);
const schema = yup.object({
  razao_social: yup.string().required(),
  nome_fantasia: yup.string().required(),
  inscricao_estadual: yup.string().min(9).max(14),
  cnpj: yup.string().min(14).max(14).required(),
  cidade: yup.string().required(),
  endereco: yup.string().required(),
  bairro: yup.string().required(),
  complemento: yup.string(),
  cep: yup.string().min(8).max(8).required(),
  numero: yup.string().required(),
  telefone1: yup.string().min(13).max(13).required(),
  telefone2: yup.string().max(13).optional(),
  email: yup.string().email().required(),
  chave_pix: yup.string().min(36).max(36).required(),
  bio: yup.string().required(),
  area_atuacao: yup.string().required(),
});

const Account: React.FC = () => {
  const { ngo } = useAuth();
  const history = useHistory();
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const watchSelect = watch("area_atuacao", "");
  const { latitude, longitude } = useLocationUser();
  const options = [
    { value: "assistencia_social", label: "Assistência Social" },
    { value: "educacao", label: "Educação" },
    { value: "meio_ambiente", label: "Meio Ambiente" },
    {
      value: "promocao_voluntariado",
      label: "Promoção do Voluntariado",
    },
    { value: "combate_pobreza", label: "Combate a pobreza" },
    { value: "protecao_animais", label: "Proteção à animais" },
    { value: "outro", label: "Outro" },
  ];

  useEffect(() => {
    setInitialPosition([latitude, longitude]);
  }, [latitude, longitude]);

  useEffect(() => {
    carregarDadosOng()
  }, []);

  async function carregarDadosOng() {
    const token = localStorage.getItem("@Evoluir:token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get(`/ngos/account/ngo/${ngo?.id}`);
    console.log('response.data ', response.data)
    const area_atuacao = options.find((option) => option.value === response.data.area_atuacao);
    setPosition({ latitude: response.data.latitude, longitude: response.data.longitude })
    setTimeout(() => {
      setValue("razao_social", response.data.razao_social);
      setValue("nome_fantasia", response.data.nome_fantasia);
      setValue("inscricao_estadual", response.data.inscricao_estadual);
      setValue("cnpj", response.data.cnpj);
      setValue("cidade", response.data.cidade);
      setValue("endereco", response.data.endereco);
      setValue("bairro", response.data.bairro);
      setValue("complemento", response.data.complemento);
      setValue("cep", response.data.cep);
      setValue("numero", response.data.numero);
      setValue("telefone1", response.data.telefone1);
      setValue("telefone2", response.data.telefone2);
      setValue("email", response.data.email);
      setValue("chave_pix", response.data.chave_pix);
      setValue("bio", response.data.bio);
      setValue("area_atuacao", area_atuacao?.value);
    });
  }

  async function handleSubmitForm(data: dataForm) {
    const dados = data;
    dados.latitude = String(position.latitude);
    dados.longitude = String(position.longitude);
    await schema.validate(dados, { abortEarly: false });
    if (!position.latitude) {
      notifyWarn("Marque a organização no mapa");
      return;
    }
    try {
      const token = localStorage.getItem("@Evoluir:token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.put(`/ngos/ngo/update/${ngo?.id}`, { dados }).catch((er) => {
        notifyError(`${er.response.data.message}`);
      });
      notifySuccess("Dados alterados com sucesso !");
      history.push("/");
    } catch (error) {
      notifyError("Entre em contato com o desenvolvedor");
    }
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  return (
    <div className={styles.container}>
      <Header
        title="Dados Pessoais"
      />
      <main>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset>
            <legend>Seus dados</legend>
            <InputForm
              id="razao_social"
              label="Razão social"
              register={register}
            />
            <p>{errors.razao_social?.message}</p>
            <InputForm
              id="nome_fantasia"
              label="Nome fantasia"
              register={register}
            />
            {/* <p>{errors.nome_fantasia?.message}</p> */}
            <InputForm
              id="inscricao_estadual"
              label="Inscrição estadual"
              register={register}
            />
            {/* <p>{errors.inscricao_estadual?.message}</p> */}
            <InputForm id="cnpj" label="CNPJ" register={register} />
            {/* <p>{errors.cnpj?.message}</p> */}

            <InputForm id="cidade" label="Cidade" register={register} />
            {/* <p>{errors.cidade?.message}</p> */}

            <InputForm id="endereco" label="Endereço" register={register} />
            {/* <p>{errors.endereco?.message}</p> */}

            <InputForm id="bairro" label="Bairro" register={register} />
            {/* <p>{errors.bairro?.message}</p> */}

            <InputForm
              id="complemento"
              label="Complemento"
              register={register}
            />
            {/* <p>{errors.complemento?.message}</p> */}

            <InputForm id="cep" label="CEP" register={register} />
            {/* <p>{errors.cep?.message}</p> */}

            <InputForm id="numero" label="Número" register={register} />
            {/* <p>{errors.numero?.message}</p> */}

            <InputForm id="telefone1" label="Telefone 1" register={register} />
            {/* {errors.telefone1 && <p> Informe o país + ddd </p>}  */}
            <InputForm id="telefone2" label="Telefone 2" register={register} />
            {/* <p>{errors.telefone2?.message}</p> */}

            <InputForm id="email" label="E-mail" register={register} />
            {/* <p>{errors.email?.message}</p> */}

            <InputForm
              id="chave_pix"
              label="Chave PIX ALEATÓRIA"
              register={register}
            />
            {/* <p>{errors.chave_pix?.message}</p> */}
          </fieldset>

          <fieldset>
            <legend>Informações Complementares</legend>
            <Textarea
              id="bio"
              label="Informações sobre a organização"
              register={register}
            />
            {/* <p>{errors.bio?.message}</p> */}
            <Select
              register={register}
              id="area_atuacao"
              label="Área de atuação"
              value={watchSelect}
              options={options}
            />
            {/* <p>{errors.area_atuacao?.message}</p> */}
          </fieldset>

          <fieldset>
            <legend>Localização</legend>
            <Map
              center={initialPosition}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>
            {/* <p>{errors.latitude?.message}</p> */}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Atualizar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Account;