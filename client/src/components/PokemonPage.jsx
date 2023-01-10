import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../actions";
import styles from "../styles/PokemonPage.module.css";

export const PokemonPage = () => {
  let pokemon = useSelector((state) => state.pokemon);
  let { id } = useParams();
  let dispatch = useDispatch();

  let { name, types, imgUrl, hp, attack, defense, speed, height, weight  } =
    pokemon;

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.background}>
      <div className={styles.pageGlobal}>
        <div className={styles.header}>
          <h2>{name}</h2>
        </div>
        <img className={styles.image} src={imgUrl} alt="Pokemon" />
        <div className={styles.info}>
          <div>
            <p>Types: </p>
            {types?.map((type, i) => {
              return <span className={styles.typesBox} key={i}>{type} </span>;
            })}
            <p>height: <span className={styles.infoblack}>{height} mts.</span></p>
            <p>weight: <span className={styles.infoblack}>{weight} kgs.</span></p>
          </div>
          <div>
            <p>
              hp: <span className={styles.infoblack}>{hp}</span>
            </p>
            <p>attack: <span className={styles.infoblack}>{attack}</span></p>
            <p>defense: <span className={styles.infoblack}>{defense}</span></p>
            <p>speed: <span className={styles.infoblack}>{speed}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
