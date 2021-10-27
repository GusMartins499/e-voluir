import React, { useState, useEffect } from "react";
import CompanyItem from "../../components/CompanyItem";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import Select from "../../components/Select2";

import styles from "../../styles/pages/Home.module.scss";
import api from "../../services/api";

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
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get<ResponseFilter[]>(
        `/ngos/filter?atuacao=${atuacao}`
      );
      setLista(response.data);
    } catch (error) {
      console.log("error ", error);
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
              { value: "Assistência Social", label: "Assistência Social" },
              { value: "Educação", label: "Educação" },
              { value: "Meio Ambiente", label: "Meio Ambiente" },
              {
                value: "Promoção do Voluntariado",
                label: "Promoção do Voluntariado",
              },
              { value: "Combate a pobreza", label: "Combate a pobreza" },
              { value: "Proteção à animais", label: "Proteção à animais" },
              { value: "Outro", label: "Outro" },
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
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
