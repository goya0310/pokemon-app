import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import gitHubLogo from "../images/GitHub-logo.png";
import linkedInLogo from "../images/linkedin-icon-18-256.png";

const NavBar = () => {
  return (
    <div className={styles.navBarGlobal}>
      <div className={styles.navBarContainer}>
        <nav>
          <ul className={styles.ul}>
            <li>
              <NavLink to={"/home"} className={styles.text}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to={"/create"} className={styles.text}>
                Crear Pokemon
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.linksContainer}>
        <a href="https://github.com/goya0310">
          <img src={gitHubLogo} alt="GitHub Link Diego Llaya" />
        </a>
        <a href="https://www.linkedin.com/in/diego-llaya-01272652/">
          <img src={linkedInLogo} alt="LinkedIn Diego Llaya" />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
