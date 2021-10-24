import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo-japa.png';

import styles from '../../styles/components/HeaderFormCompany.module.scss';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const HeaderFormCompany: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.topBarContainer}>
        <Link to="/">
          <FiArrowLeft color="#fff"/>
        </Link>
        <img src={logoImg} alt="e-voluir" />
      </div>

      <div className={styles.headerContent}>
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}

        {props.children}
      </div>
    </header>
  );
}

export default HeaderFormCompany;