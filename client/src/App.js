import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import Logo from '../src/imgs/logo.png'

import Footer from "./pages/Footer";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    apelido: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            apelido: response.data.apelido,
            id: response.data.id,
            status: true,
          });
          console.log(response.data.email)
          console.log(response.data.apelido)
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", apelido: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <img className="logo" src={Logo}></img>
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login </Link>
                  <Link to="/registration">Cadastrar-se</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Dashboard </Link>
                  <Link to="/createpost"> Criar Lembrete </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.email} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
        <Footer/>

      </div>
  );
}

export default App;
