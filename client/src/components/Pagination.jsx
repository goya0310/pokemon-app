import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = (props) => {
  const { pokemons, currentPage, handlePages } = props;

  const totalPages = Math.ceil(pokemons.length / 8); //8 pokemons por pagina
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.paginationGlobal}>
      {pages.length !== 0 && (
        <ul className={styles.ulGlobal}>
          <li className={styles.actualPage}>
            <button
              className={styles.button}
              onClick={() => {
                if (currentPage > 1) return handlePages(currentPage - 1);
              }}
            >
              {"<"}
            </button>
          </li>
          {pages?.map((number) => {
            return (
              <li key={number}>
                <button
                  className={`${styles.button} ${number === currentPage? styles.active: ""}`}
                  onClick={() => {
                    return handlePages(number);
                  }}
                >
                  {number}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className={styles.button}
              onClick={() => {
                if (currentPage < pages.length) handlePages(currentPage + 1);
              }}
            >
              {">"}
            </button>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;

export const pokemonIndex = (page, pokemonsXPage) => {
  const lastPokemon = page * pokemonsXPage;
  const firstPokemon = lastPokemon - pokemonsXPage;
  return { lastPokemon, firstPokemon };
};
