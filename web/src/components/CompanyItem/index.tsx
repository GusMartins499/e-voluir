import React from "react";
import whatsappIcon from "../../assets/icons/whatsapp.svg";

import styles from "../../styles/components/CompanyItem.module.scss";

interface CompanyItemProps {
  nome_fantasia: string;
  area_atuacao: string;
  bio: string;
  telefone: string;
}

const CompanyItem: React.FC<CompanyItemProps> = ({
  nome_fantasia,
  area_atuacao,
  bio,
  telefone,
}) => {
  return (
    <article className={styles.item}>
      <header>
        {/* <img src={teacher.avatar} alt={teacher.name} /> */}
        <div>
          <strong>{nome_fantasia}</strong>
          <span>{area_atuacao}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          <strong>Fazer uma doação</strong>
        </p>

        <a target="_blank" href={`http://wa.me/${telefone}`}>
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default CompanyItem;
