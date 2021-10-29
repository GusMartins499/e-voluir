import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../../styles/pages/Donation.module.scss";

import { PIX } from "gpix/dist";

import HeaderFormCompany from "../../components/HeaderFormCompany";
import InputForm from "../../components/InputForm";

import DefaultQRCode from "../../assets/qrcode.png";
import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";

type responseNGO = {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  telefone1: string;
  telefone2: string;
  email: string;
  chave_pix: string;
  cidade: string;
};

const schema = yup
  .object({
    valor: yup.number().positive().required(),
  })
  .required();

const Donation: React.FC = () => {
  const { id: UUIDNGO } = useParams<{ id: string }>();
  const [qrcode, setQrcode] = useState<string | null>("");
  const [ngo, setNgo] = useState({} as responseNGO);
  const [valorDoacao, setValorDoacao] = useState(1);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    carregarOng();
  }, []);

  async function carregarOng() {
    const token = localStorage.getItem("@Evoluir:token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get<responseNGO>(`/ngos/${UUIDNGO}`);
    setNgo(response.data);
    setTimeout(() => {
      setValue("razao_social", response.data.razao_social);
      setValue("nome_fantasia", response.data.nome_fantasia);
      setValue("cnpj", response.data.cnpj);
      setValue("telefone1", response.data.telefone1);
      setValue("telefone2", response.data.telefone2);
      setValue("email", response.data.email);
    });
  }

  async function handleQRCode(data: any) {
    console.log("data ", data);

    const pix = PIX.static()
      .setReceiverName(ngo.nome_fantasia)
      .setReceiverCity(ngo.cidade)
      .setKey(ngo.chave_pix)
      .setDescription(`Doação para a ONG ${ngo.nome_fantasia}`)
      .setAmount(Number(data.valor));

    const base64QRcode = await pix.getQRCode();
    setQrcode(base64QRcode);
  }

  return (
    <div className={styles.container}>
      <HeaderFormCompany title="Que incrível que você quer ajudar uma ONG" />
      <main>
        <form onSubmit={handleSubmit(handleQRCode)}>
          <fieldset>
            <legend>Confira os dados para a doação</legend>
            <InputForm
              id="razao_social"
              label="Razão Social"
              disabled
              register={register}
            />
            <InputForm
              id="nome_fantasia"
              label="Nome fantasia"
              disabled
              register={register}
            />
            <InputForm id="cnpj" label="CNPJ" register={register} disabled />
            <InputForm
              id="telefone1"
              label="Telefone 1"
              register={register}
              disabled
            />
            <InputForm
              id="telefone2"
              label="Telefone 2"
              register={register}
              disabled
            />
            <InputForm id="email" label="E-mail" register={register} disabled />
            <InputForm id="valor" label="Valor da doação" register={register} />
            {errors.valor?.message && <p>Digite um valor válido</p>}
          </fieldset>
          <footer>
            {qrcode ? (
              <img src={qrcode} alt="qrcode-pix" />
            ) : (
              <img src={DefaultQRCode} alt="qrcode-pix-invalido" />
            )}
            <div>
              <button type="submit">Gerar QRCODE</button>
              <Link to="/">
                <FiArrowLeft />
                Retornar para tela anterior
              </Link>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Donation;
