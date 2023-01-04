import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../actions";

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const searchByName = (e) => {
    e.preventDefault();
    dispatch(searchPokemon(input));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="buscar por nombre"
        autoComplete="off"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit" onClick={(e) => searchByName(e)}>
        go
      </button>
    </div>
  );
};

export default Search;
