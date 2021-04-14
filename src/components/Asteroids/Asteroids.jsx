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
    <>
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
        Расстояние{" "}
        <button onClick={() => setInLunar(false)}>в километрах</button>
        <button onClick={() => setInLunar(true)}>в дистанциях до луны</button>
      </div>
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
    </>
  );
};

export default Asteroids;
