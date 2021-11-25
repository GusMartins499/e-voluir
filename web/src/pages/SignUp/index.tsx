import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { ptForm } from "yup-locale-pt";
import * as yup from "yup";

import api from "../../services/api";

import styles from "./styles.module.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { notifyError } from "../../components/Toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

yup.setLocale(ptForm);
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const SignUp: React.FC = () => {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const hadleCreateAccount = useCallback(
    async (data: SignUpFormData) => {
      await schema.validate(data, { abortEarly: false });
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
            onSubmit={handleSubmit(hadleCreateAccount)}
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
            {errors.name && <p>{errors.name.message}</p>}
            <Input
              id="email"
              icon={FiMail}
              placeholder="E-mail"
              type="email"
              register={register}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
              register={register}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Button type="submit">Cadastrar</Button>
            <Link to="/login">
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
