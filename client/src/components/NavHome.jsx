import React from "react";
import { useSelector } from "react-redux";
import Search from "./Search";
import styles from "../styles/NavHome.module.css";

const NavHome = ({
  handleOrderByName,
  handlePokemonByAttack,
  handleGetByType,
  handleGetPokemonsCreated,
}) => {
  const types = useSelector((state) => state.types);
  return (
    <div className={styles.navHomeGlobal}>
      <ul className={styles.listContainer}>
        <li>
          <>
            <Search />
          </>
        </li>
        <li>
          <select className={styles.selectStyles}
            name="sortType"
            onChange={(e) => {
              handleOrderByName(e.target.value);
            }}
          >
            <option>Orden Alfabético</option>
            <option value="az">A a Z</option>
            <option value="za">Z a A</option>
          </select>
        </li>
        <li>
          <select className={styles.selectStyles}
            name="sortType"
            onChange={(e) => {
              handlePokemonByAttack(e.target.value);
            }}
          >
            <option>Orden Por Ataque</option>
            <option value="az">Menor</option>
            <option value="za">Mayor</option>
          </select>
        </li>
        <li>
          <select className={styles.selectStyles} name="type" onChange={(e) => handleGetByType(e.target.value)}>
            <option value="xdefecto">Orden por Type</option>
            {types?.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </li>
        <li>
          <select className={styles.selectStyles}
            name="pokemon"
            onChange={(e) => handleGetPokemonsCreated(e.target.value)}
          >
            <option value="">Orden por Origen</option>
            <option value="api">API</option>
            <option value="db">Creados</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default NavHome;
