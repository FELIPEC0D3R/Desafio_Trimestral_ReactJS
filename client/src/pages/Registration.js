import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

import css from '../App.css'

function Registration() {

  const initialValues = {
    username: "",
    sobrenome: "",
    email: "",
    apelido: "",
    password: "",
    confirmpassword: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("O nome é obrigatório"),
    sobrenome: Yup.string().min(3).max(15).required("O sobrenome de usuário é obrigatório"),
    email: Yup.string().email("Formato do e-mail inválido. Lembre-se de colocar '@'").min(3).max(30).required("O email de usuário é obrigatório"),
    apelido: Yup.string().min(3).max(15).required("O nome de usuário é obrigatório"),
    password: Yup.string().min(4).max(20).required("A senha de usuário é obrigatória"),
    confirmpassword:
    Yup.string()
    .required('Por favor repita sua senha')
    .oneOf([Yup.ref('password')], 'Suas senhas não são iguais')
  });

  const onSubmit = (data) => {
      axios.post("http://localhost:3001/auth", data).then(() => {
        alert("Usuário Cadastrado com sucesso!!")
        console.log(data);
      });
    
  };

  return (
    <div className="register">
      {/* <h1>Cadastrar-se</h1> */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          
          <ErrorMessage name="username" component="span" className="errorForm" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Insira o seu nome"
            
          />
        
          <ErrorMessage name="sobrenome" component="span"  className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="sobrenome"
            placeholder="Insira seu sobrenome"
            
          />

          
          <ErrorMessage name="email" component="span" className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="Insira seu email"
            
          />

          
          <ErrorMessage name="apelido" component="span" className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="apelido"
            placeholder="Insira como deseja ser chamado"
            
          />

          
          <ErrorMessage name="password" component="span" className="errorForm"/>
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Insira sua senha"
          />

          
          <ErrorMessage name="confirmpassword" component="span" className="errorForm"/>
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="confirmpassword"
            placeholder="Digite a senha novamente"
          />

          <button type="submit">Registrar</button>
          <p>Já Possui uma conta? <a href="/login">Fazer Login</a></p>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
