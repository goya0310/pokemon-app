import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Create from './components/CreatePokemon';
import Home from './components/Home';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import { PokemonPage } from './components/PokemonPage';


function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Route exact path={'/'} component={Landing}/>
      <Route exact path={'/home'} component={Home}/>
      <Route exact path={'/create'} component={Create} />
      <Route exact path={'/pokemons/:id'} component={PokemonPage} />
    </React.Fragment>
  );
}

export default App;
