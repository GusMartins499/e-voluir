import React, { useState, useEffect } from "react";
import CompanyItem from "../../components/CompanyItem";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import Select from "../../components/Select2";

import styles from "../../styles/pages/Home.module.scss";
import api from "../../services/api";
import { notifyError } from "../../components/Toast";

interface ResponseFilter {
  area_atuacao: string;
  bio: string;
  telefone1: string;
  nome_fantasia: string;
  id: string;
}

const Home: React.FC = () => {
  const [atuacao, setAtuacao] = useState("");
  const [lista, setLista] = useState<ResponseFilter[]>([]);

  async function handleListFilter() {
    try {
      const token = localStorage.getItem("@Evoluir:token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api
        .get<ResponseFilter[]>(`/ngos/filter?atuacao=${atuacao}`)
        .then((lista) => {
          setLista(lista.data);
        })
        .catch((er) => {
          notifyError(`${er.response.data.message}`);
        });
    } catch (error) {
      notifyError("Entre em contato com o desenvolvedor");
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.filtros}>
        <div>
          <Select
            value={atuacao}
            onChange={(event) => setAtuacao(event.target.value)}
            id="area_atuacao"
            label="Área de atuação"
            options={[
              { value: "", label: "" },
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
            ]}
          />
        </div>
        <Button onClick={handleListFilter}>Pesquisar</Button>
      </div>
      <div className={styles.container}>
        {lista.map((item, index) => {
          return (
            <CompanyItem
              key={item.id}
              nome_fantasia={item.nome_fantasia}
              area_atuacao={item.area_atuacao}
              bio={item.bio}
              telefone={item.telefone1}
              id={item.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
