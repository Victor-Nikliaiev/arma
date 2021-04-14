import React from "react";
import { Link } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import { useDestroyService } from "../../providers/DestroyProvider";

const DestroyItem = ({ asterId }) => {
  const {
    removeAsterFromDestroyList,
    getAsterFullInfoById,
  } = useDestroyService();
  const { inLunar } = useAsteroidList();
  const asteroid = getAsterFullInfoById(asterId);

  return (
    <div className="asterToDestroy" style={{ marginBottom: "1rem" }}>
      <div>
        <Link to={`/asteroid/${asterId}`}>
          <h2>{asteroid.name}</h2>
        </Link>

        <div>Дата ... {asteroid.date_short}</div>

        <div>
          Расстояние {"..."}{" "}
          <span>
            {inLunar
              ? asteroid.distance_lunar + " луны"
              : asteroid.distance + " км"}
          </span>
        </div>

        <div>
          Размер {"..."} {asteroid.size + " м"}
        </div>
      </div>

      <div>
        <div>
          Оценка:
          {asteroid.isHazardous ? "Опасный" : "Неопасный"}
        </div>
        <button onClick={() => removeAsterFromDestroyList(asteroid.id)}>
          Вызвать бригаду Брюса
        </button>
      </div>
    </div>
  );
};

export default DestroyItem;
