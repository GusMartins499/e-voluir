import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import styles from "../../styles/pages/SignUp.module.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { notifyError } from "../../components/Toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const testeForm = useCallback(
    async (data: SignUpFormData) => {
      try {
        await api.post("/users", data).catch((er) => {
          notifyError(er.response.data.message);
        });

        history.push("/login");
      } catch (error) {
        notifyError("Entre em contato com o desenvolvedor");
      }
    },
    [history]
  );

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.content}>
        <div className={styles.containerForm}>
          <form
            onSubmit={handleSubmit(testeForm)}
            className={styles.formSignUp}
          >
            <h1>Faça seu cadastro</h1>
            <Input
              id="name"
              icon={FiUser}
              placeholder="Nome"
              type="text"
              register={register}
            />
            <Input
              id="email"
              icon={FiMail}
              placeholder="E-mail"
              type="email"
              register={register}
            />
            <Input
              id="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
              register={register}
            />
            <Button type="submit">Cadastrar</Button>
            <Link to="/">
              <FiArrowLeft />
              Voltar para Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
