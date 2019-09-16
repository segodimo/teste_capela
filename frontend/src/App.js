import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Navegador from './components/Navegador';
import CreateFilme from './components/CreateFilme';
import SessoesList from './components/SessoesList';
import CreateSessao from './components/CreateSessao';
import CreateCinema from './components/CreateCinema';

function App() {
  return (
    <Router>
      <Navegador />
      <div className="container p-4">
        <Route path="/" exact component={SessoesList} />
        <Route path="/editsessao" exact component={CreateSessao} />
        <Route path="/editsessao/:id" exact component={CreateSessao} />
        <Route path="/editfilme/" exact component={CreateFilme} />
        <Route path="/editcinema" exact component={CreateCinema} />
      </div>
    </Router>
  );
}

export default App;
