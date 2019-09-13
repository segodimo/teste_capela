import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Navegador from './components/Navegador';
import CreateFilme from './components/CreateFilme';
import SessoesList from './components/SessoesList';
import CreateSessao from './components/CreateSessao';
import CreateCinema from './components/CreateCinema';
// import FilmesList from './components/FilmesList';

function App() {
  return (
    <Router>
      <Navegador />
      <div className="container p-4">
        <Route path="/" exact component={SessoesList} />
        <Route path="/sessaoce" exact component={CreateSessao} />
        <Route path="/sessaoce/:id" exact component={CreateSessao} />
        <Route path="/editfilme/" exact component={CreateFilme} />
        <Route path="/editcinema" exact component={CreateCinema} />
        {/* <Route path="/filmes" exact component={FilmesList} /> */}
        {/* <Route path="/sessoes" exact component={SessoesList} /> */}
        {/* <Route path="/editfilme/:id" exact component={CreateFilme} /> */}
        {/* <Route path="/edit/:id" component={CreateNote} /> */}
        {/* <Route path="/create" component={CreateNote} /> */}
        {/* <Route path="/user" component={CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;