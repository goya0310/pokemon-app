import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Pokemon.module.css";

export const Pokemon = (props) => {
  const { name, types, imgUrl, id, createInDb } = props.pokemons;

  return (
    <div className={styles.pokemonGlobal}>
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>
      {createInDb ? (
        <div className={styles.id}>
          <p>{id.slice(0, 2)}</p>
        </div>
      ) : (
        <div className={styles.id}>
          <p>{id}</p>
        </div>
      )}

      <div className={styles.info}>
        <p>
          Types:
          {types?.map((type, i) => (
            <span> {type} </span>
          ))}
        </p>
      </div>
      <img className={styles.image} src={imgUrl} loading="lazy" alt="Pokemon" />
      <div className={styles.link}>
        <Link to={`/pokemons/${id}`}>
          <button className={styles.button}>Detalles</button>
        </Link>
      </div>
    </div>
  );
};
