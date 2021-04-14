import React from "react";
import { Link, NavLink } from "react-router-dom";

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
        <NavLink className="navLink" activeClassName="active" to="/asteroids">
          Астероиды
        </NavLink>
        <NavLink className="navLink" activeClassName="active" to="/destroy">
          Уничтожение
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
