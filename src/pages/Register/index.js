import { useState } from 'react'

import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import pombo from '../images/pombo.png'


export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true })
      })
      .catch(() => {
        console.log("ERRO AO FAZER O CADASTRO")
      })


    }else{
      alert("Preencha todos os campos!")
    }


  }


  return(
    <>
    <h1>Cadastre-se no Pombo correio</h1>
    <div className='teste2'>
    <div className="home-container">
      {/* <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span> */}

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Insira seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />

        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value) }
        />

        <button type="submit" >Cadastrar-se</button>
      </form>

      <Link className="button-link" to="/">
        Já possui uma conta? Faça login!
      </Link>

    </div>

    <div className='teste'>
      <img className='pombo' src={pombo}></img>
    </div>
    </div>

    </>
  )
}