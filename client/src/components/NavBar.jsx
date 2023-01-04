import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/create"}>Create Pokemon</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
