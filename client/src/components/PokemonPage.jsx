import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../actions";

export const PokemonPage = () => {
  let pokemon = useSelector((state) => state.pokemon);
  let { id } = useParams();
  let dispatch = useDispatch();

  const { name, types, imgUrl, hp, attack, defense, speed, height, weight } =
    pokemon;

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div>
      <p>{id}</p>
      <h2>{name}</h2>
      <div>
        <span>Types: </span>
        {types?.map((type, i) => {
          return <span key={i}>{type} </span>;
        })}
      </div>
      <p>hp: {hp}</p>
      <p>attack: {attack}</p>
      <p>defense: {defense}</p>
      <p>speed: {speed}</p>
      <p>heigth: {height}</p>
      <p>weigth: {weight}</p>
      <img src={imgUrl} alt="Pokemon" />
    </div>
  );
};
