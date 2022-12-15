import pombo from '../images/pombo.png'

import { useState } from 'react'
import './home.css'

import { Link } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // navegar para /admin
        navigate('/admin', { replace: true } )
      })
      .catch(() => {
        console.log("ERRO AO FAZER O LOGIN")
      })

    }else{
      alert("Preencha todos os campos!")
    }


  }


  return(
    <>
    <h1>Bem-Vindo ao Pombo Correio!!</h1>
    {/* <p className='subTit'>Gerencie sua agenda de forma fácil.</p> */}
    <div className='teste2'>
    <div className="home-container">
     

      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />

        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value) }
        />

        <button type="submit" >Entrar</button>
      </form>

      <Link className="button-link" to="/register">
        Não possui uma conta? Cadastre-se
      </Link>


    </div>

    <div className='teste'>
      <img className='pombo' src={pombo}></img>
    </div>
    </div>
    </>
  )
}