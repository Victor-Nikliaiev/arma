import "../../styles/StyleReseter.scss";
import "./Asteroid.scss";

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
      <div className="aster-ic-1">
        <div className="aster-ic-2">
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
      </div>

      <div className="aster-ic-1">
        <div>
          <div>Оценка:</div>
          <div>{asteroid.isHazardous ? "Опасный" : "Неопасный"}</div>
          <button
            onClick={() => {
              addAsterToDestroyList(asterId);
              deleteAsterFromTheMainList(asterId);
            }}
          >
            На уничтожение
          </button>
        </div>
      </div>
    </article>
  );
};

export default Asteroid;
