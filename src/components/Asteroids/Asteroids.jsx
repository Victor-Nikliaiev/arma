import { NavLink } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import Asteroid from "./Asteroid";

const Asteroids = () => {
  const {
    filteredAsteroids,
    dangerOn,
    setDangerOn,
    inLunar,
    setInLunar,
  } = useAsteroidList();
  const handleCheckboxChange = (e) => {
    setDangerOn(!dangerOn);
  };
  return (
    <section className="mainAsteroids">
      <div className="checkMenu">
        <div>
          <input
            type="checkbox"
            name="dangerOn"
            onChange={handleCheckboxChange}
            checked={dangerOn}
          />{" "}
          Показать только опасные
        </div>
        <div>
          <span>Расстояние </span>

          <button
            className={`toggleDistanceBtn ${!inLunar ? "active" : ""}`}
            onClick={() => setInLunar(false)}
          >
            в километрах
          </button>

          <span>,</span>

          <button
            className={`toggleDistanceBtn ${inLunar ? "active" : ""}`}
            onClick={() => setInLunar(true)}
          >
            в дистанциях до луны
          </button>
        </div>
      </div>
      <section className="asteroids">
        {filteredAsteroids.map((asteroid) => {
          return (
            <Asteroid
              key={asteroid.id}
              asterId={asteroid.id}
              inLunar={inLunar}
              dangerOn={dangerOn}
            />
          );
        })}
      </section>
    </section>
  );
};

export default Asteroids;
