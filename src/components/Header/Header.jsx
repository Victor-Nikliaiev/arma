import "./Header.scss";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>armaggedon v</h1>
        <p>
          Сервис мониторинга и уничтожения астероидов, опасно подлетающих
          к Земле.
        </p>
      </div>
      <div className="logoNav">
        <NavLink
          className="navLink-link"
          activeClassName="active"
          to="/asteroids"
        >
          <span className="navLink">Астероиды</span>
        </NavLink>
        <NavLink
          className="navLink-link"
          activeClassName="active"
          to="/destroy"
        >
          <span className="navLink">Уничтожение</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
