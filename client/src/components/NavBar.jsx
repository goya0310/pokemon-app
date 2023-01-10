import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
  return (
    <nav className={styles.navBarGlobal}>
      <ul className={styles.ul}>
        <li>
          <NavLink to={"/home"} className={styles.text}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to={"/create"} className={styles.text}>Crear Pokemon</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
