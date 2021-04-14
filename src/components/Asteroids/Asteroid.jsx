import React from "react";
import { Link } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import { useDestroyService } from "../../providers/DestroyProvider";

const Asteroid = ({ asterId, inLunar }) => {
  const { addAsterToDestroyList } = useDestroyService();
  const {
    deleteAsterFromTheMainList,
    getAsterFullInfoById,
  } = useAsteroidList();

  const asteroid = getAsterFullInfoById(asterId);
  return (
    <article className="asteroid">
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
        <button
          onClick={() => {
            addAsterToDestroyList(asterId);
            deleteAsterFromTheMainList(asterId);
          }}
        >
          На уничтожение
        </button>
      </div>
    </article>
  );
};

export default Asteroid;
