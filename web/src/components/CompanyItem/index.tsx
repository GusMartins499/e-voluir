import React from "react";
import { Link } from "react-router-dom";

import whatsappIcon from "../../assets/icons/whatsapp.svg";

import styles from "./styles.module.scss";

interface CompanyItemProps {
  nome_fantasia: string;
  area_atuacao: string;
  bio: string;
  telefone: string;
  id: string;
}

const CompanyItem: React.FC<CompanyItemProps> = ({
  nome_fantasia,
  area_atuacao,
  bio,
  telefone,
  id,
}) => {
  return (
    <article className={styles.item}>
      <header>
        <div>
          <strong>{nome_fantasia}</strong>
          <span>{area_atuacao}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          <Link to={`/donation/ngo/${id}`}>Fazer uma doação</Link>
        </p>

        <a target="_blank" rel="noreferrer" href={`http://wa.me/${telefone}`}>
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default CompanyItem;
