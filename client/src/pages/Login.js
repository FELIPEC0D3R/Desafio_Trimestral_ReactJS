import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apelido, setApelido] = useState("");
  const { setAuthState } = useContext(AuthContext);

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email("Formato do e-mail inválido. Lembre-se de colocar '@'").min(3).max(30).required("O email de usuário é obrigatório"),
  //   apelido: Yup.string().min(3).max(15).required("O nome de usuário é obrigatório"),
  //   password: Yup.string().min(4).max(20).required("A senha de usuário é obrigatória")
  // });


  let history = useHistory();

  const login = () => {
    const data = { email: email, apelido: apelido, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {

      if (response.data.error || email == '') {
        // alert(response.data.error);
        console.log('Usuário não existe!')
        history.push("/login");
        window.location.reload(true);
        // alert("Ocorreu um erro pois o usuário que voce tentou logar não existe OU voce deixou os campos em branco. Reinicie a API para executar o projeto")

      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          email: response.data.email,
          apelido: response.data.apelido,
          id: response.data.id,
          status: true,
        });
        console.log(response.data.password)
        console.log(response.data.apelido)
        console.log(response.data.email)
        history.push("/");
        window.location.reload(true);
      }
    });
  };


  return (
    <div className="loginContainer">
    {/* <Formik onSubmit={login} validationSchema={validationSchema}> */}

    <Formik onSubmit={login}>
    
    <Form className="formContainerLogin">

    <ErrorMessage name="email" component="span" className="errorForm" />
      <Field
        type="text"
        id="inputLogin"
        name='email'
        onChange={(event) => {
          setEmail(event.target.value);
        }}

        placeholder="Informe seu email"
      />

    <ErrorMessage name="apelido" component="span" className="errorForm" />
      <Field
        type="text"
        id="inputLogin"
        name='apelido'
        onChange={(event) => {
          setApelido(event.target.value);
        }}

        placeholder="Informe seu nickname"
      />

    <ErrorMessage name="password" component="span" className="errorForm" />
      <Field
        type="password"
        id="inputLogin"
        name='password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Informe sua senha"
      />

      <button type="submit" id="btnLogin" onClick={login}> Entrar </button>
      <p>Não Possui uma conta? <a href="/registration">Cadastrar-se</a></p>
        </Form>
    </Formik>
    </div>
  );
}

export default Login;
