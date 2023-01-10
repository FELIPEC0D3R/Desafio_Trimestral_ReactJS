import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import { useRef } from 'react'

import emailjs from '@emailjs/browser';

function CreatePost() {
  
  const { authState } = useContext(AuthContext);
  

  let history = useHistory();
  const initialValues = {
    title: "",
    postText: "",
    apelido: "",
    email: ""
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Voce precisa inserir um titulo para seu lembrete!"),
    postText: Yup.string().required("Voce precisa atribuir uma descrição para seu lembrete"),
    apelido: Yup.string().required("Informe um nome para que possamos nos comunicar com voce"),

  });

  console.log(authState.email)
  console.log(authState.apelido)


  const onSubmit = (data) => {
    
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history.push("/");
        console.log(data.title)
        console.log(data.postText)
        console.log(data.apelido)
        console.log(authState.email)

        const templateParams = {
          title: data.title,
          name: data.apelido,
          from_name: "Pombo Correio",
          message: data.postText, // pega a descrição do lembrete após o post dele no banco de dados
          email: authState.email // Pega o email cadastrado no token do usuário
        }
    
    
        emailjs.send("service_h0a25nq", "template_vxklv0k", templateParams, "S021WWiNusnrGPqj7")
        .then((response) => {
          alert("Deu certo")
          console.log("EMAIL ENVIADO", response.status, response.text)
          
    
        }, (err) => {
          console.log("ERRO: ", err)
          })
      });



  };

  return (
    <>
    <div className="createPostPage">
     
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <ErrorMessage name="title" component="span"  className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Insira o titulo do seu lembrete"
            
          />
  
          <ErrorMessage name="postText" component="span"  className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Insira a descrição do seu lembrete"
          />

          <ErrorMessage name="apelido" component="span"  className="errorForm"/>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="apelido"
            placeholder="Informe como deseja ser chamado"
            
          />

          <button type="submit"> Salvar </button>
        </Form>
      </Formik>
    </div>
    </>
  );
}


export default CreatePost;
