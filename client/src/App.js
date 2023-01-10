import React from "react";
import { Route, useLocation } from "react-router-dom";
import "./App.css";
import Create from "./components/CreatePokemon";
import Home from "./components/Home";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import { PokemonPage } from "./components/PokemonPage";

function App() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <Route exact path={"/"} component={Landing} />
      {pathname !== "/" ? <NavBar /> : null}
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/create"} component={Create} />
      <Route exact path={"/pokemons/:id"} component={PokemonPage} />
    </React.Fragment>
  );
}

export default App;
