import React, { useState, useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

import warningIcon from '../../assets/icons/warning.svg';
import styles from '../../styles/pages/SignUpCompany.module.scss';

import InputForm from '../../components/InputForm';
import Header from '../../components/HeaderFormCompany';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import mapIcon from '../../utils/mapIcon';

interface SubmitFormData {
  [key: string]: string;
}

function SignUpCompany() {
  const { register, handleSubmit, watch } = useForm();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const watchSelect = watch("area_atuacao", "");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    })
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmitForm(data: SubmitFormData) {
    const dados = data;
    dados.latitude = String(position.latitude);
    dados.longitude = String(position.longitude);
    console.log('dados ', dados);
   try {
      const response = await api.post('/ngos', { dados });
      console.log('response ', response);
    } catch (error) {
      console.log('error ', error);
    }
  }

  return (
    <div className={styles.container}>
      <Header
        title="Que incrível que você quer se juntar a plataforma"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset>
            <legend>Seus dados</legend>
            <InputForm id="razao_social" label="Razão social" register={register} />
            <InputForm id="nome_fantasia" label="Nome fantasia" register={register} />
            <InputForm id="inscricao_estadual" label="Inscrição estadual" register={register} />
            <InputForm id="cnpj" label="CNPJ" register={register} />
            <InputForm id="endereco" label="Endereço" register={register} />
            <InputForm id="bairro" label="Bairro" register={register} />
            <InputForm id="complemento" label="Complemento" register={register} />
            <InputForm id="cep" label="CEP" register={register} />
            <InputForm id="numero" label="Número" register={register} />
            <InputForm id="telefone1" label="Telefone 1" register={register} />
            <InputForm id="telefone2" label="Telefone 2" register={register} />
            <InputForm id="email" label="E-mail" register={register} />
          </fieldset>
          
          <fieldset>
            <legend>Informações Complementares</legend>
            <Textarea id="bio" label="Informações sobre a organização" register={register} />
            <Select
              register={register}
              id="area_atuacao"
              label="Área de atuação"
              value={watchSelect}
              options={[
                { value: 'Assistência Social', label: 'Assistência Social' },
                { value: 'Educação', label: 'Educação' },
                { value: 'Meio Ambiente', label: 'Meio Ambiente' },
                { value: 'Promoção do Voluntariado', label: 'Promoção do Voluntariado' },
                { value: 'Combate a pobreza', label: 'Combate a pobreza' },
                { value: 'Proteção à animais', label: 'Proteção à animais' },
                { value: 'Outro', label: 'Outro' },
              ]}
            />
          </fieldset>
          <fieldset>
            <legend>Localização</legend>
            <Map
              center={initialPosition}
              style={{ width: '100%', height: 280 }}
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
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
                Importante ! <br />
                Preencha todos os dados
              </p>
            <button type="submit">
              Salvar cadastro
              </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default SignUpCompany;