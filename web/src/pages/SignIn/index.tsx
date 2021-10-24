import React from "react";
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logoImg from "../../assets/logo2.png";

import styles from "../../styles/pages/SignIn.module.scss";

const SignIn: React.FC = () => {
  const { register } = useForm();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerForm}>
          <img src={logoImg} alt="e-voluir" />

          <form className={styles.formSignIn}>
            <h1>Faça seu Login</h1>

            <Input
              register={register}
              id="email"
              icon={FiMail}
              placeholder="E-mail"
              type="email"
            />
            <Input
              register={register}
              id="senha"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </form>

          <div className={styles.footer}>
            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
            <Link to="/signupcompany">
              <FiLogIn />
              Sou uma Ong
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
};

export default SignIn;
