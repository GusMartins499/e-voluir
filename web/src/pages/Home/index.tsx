import React from "react";
import CompanyItem from "../../components/CompanyItem";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button"
import Select from "../../components/Select2";

import styles from "../../styles/pages/Home.module.scss";

const Home: React.FC = () => {
  const array = [
    {
      nome_fantasia: "Nome 1",
      area_atuacao: "Area de atuação",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatum magni cum! Eos esse voluptatibus, aliquid perspiciatis pariatur omnis explicabo cupiditate sapiente, aspernatur provident quisquam libero nostrum aliquam, odio cumque?",
      telefone: "36323510",
    },
    {
      nome_fantasia: "Nome 1",
      area_atuacao: "Area de atuação",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatum magni cum! Eos esse voluptatibus, aliquid perspiciatis pariatur omnis explicabo cupiditate sapiente, aspernatur provident quisquam libero nostrum aliquam, odio cumque?",
      telefone: "36323510",
    },
    {
      nome_fantasia: "Nome 1",
      area_atuacao: "Area de atuação",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatum magni cum! Eos esse voluptatibus, aliquid perspiciatis pariatur omnis explicabo cupiditate sapiente, aspernatur provident quisquam libero nostrum aliquam, odio cumque?",
      telefone: "36323510",
    },
  ];
  return (
    <>
      <NavBar />
      <div className={styles.filtros}>
          <Select
            id="area_atuacao"
            label="Área de atuação"
            options={[
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
          <Button>Pesquisar</Button>
      </div>
      <div className={styles.container}>
        {array.map((item, index) => {
          return (
            <CompanyItem
              key={index}
              nome_fantasia={item.nome_fantasia}
              area_atuacao={item.area_atuacao}
              bio={item.bio}
              telefone={item.telefone}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
