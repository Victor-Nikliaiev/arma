import React, { useState } from "react";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import Asteroid from "./Asteroid";

const Asteroids = () => {
  const { filteredAsteroids, dangerOn, setDangerOn } = useAsteroidList();
  const [inLunar, setInLunar] = useState(false);
  const handleCheckboxChange = (e) => {
    setDangerOn(e.target.checked);
  };
  return (
    <>
      <div>
        <input
          type="checkbox"
          name="dangerOn"
          onChange={handleCheckboxChange}
        />{" "}
        Показать только опасные
      </div>
      <div>
        Расстояние{" "}
        <button onClick={() => setInLunar(false)}>в километрах</button>
        <button onClick={() => setInLunar(true)}>в дистанциях до луны</button>
      </div>
      {filteredAsteroids.map((asteroid) => {
        return (
          <Asteroid
            key={asteroid.id}
            asteroid={asteroid}
            inLunar={inLunar}
            dangerOn={dangerOn}
          />
        );
      })}
    </>
  );
};

export default Asteroids;
