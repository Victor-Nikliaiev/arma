import React from "react";

const Header = () => {
  return (
    <header>
      <div className="logoGroup">
        <h1>ARMAGGEDON V</h1>
        <div>
          <button>Астероиды</button>
          <button>Уничтожение</button>
        </div>
      </div>
      <p>
        Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
      </p>
    </header>
  );
};

export default Header;
