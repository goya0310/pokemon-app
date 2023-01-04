import React from "react";
import { Link } from "react-router-dom";

export const Pokemon = (props) => {
  const { name, types, imgUrl, id } = props.pokemons;

  return (
    <div>
      <div>
        <img src={imgUrl} loading="lazy" alt="Pokemon" />
      </div>
      <div>
        <h2>{name}</h2>
        <div>{id}</div>
        {types?.map((type) => (
          <p>{type} </p>
        ))}
        <Link to={`/pokemons/${id}`}>
          <button>Detalles</button>
        </Link>
      </div>
    </div>
  );
};
