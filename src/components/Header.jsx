import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logoGroup">
        <h1>ARMAGGEDON V</h1>
        <div>
          <Link to="/">Астероиды</Link>
          <Link to="/destroy">Уничтожение</Link>
        </div>
      </div>
      <p>
        Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
      </p>
    </header>
  );
};

export default Header;
