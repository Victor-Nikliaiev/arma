import dino from "../../svg/dino.svg";

import "../../styles/StyleReseter.scss";
import "./Asteroid.scss";

import React from "react";
import { Link } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import { useDestroyService } from "../../providers/DestroyProvider";

import {
  setSvgToImg,
  setGradientMob,
  setGradientBg,
} from "../../utils/setStyles";

const Asteroid = ({ asterId, inLunar }) => {
  const { addAsterToDestroyList } = useDestroyService();
  const {
    deleteAsterFromTheMainList,
    getAsterFullInfoById,
  } = useAsteroidList();
  const asteroid = getAsterFullInfoById(asterId);
  const svg = setSvgToImg(asteroid.size);

  return (
    <article
      className={`asteroid ${setGradientBg(asteroid.isHazardous, "asteroid")} `}
    >
      <img
        src={svg.path}
        className={`asteroid-img aster-${svg.id}`}
        alt={svg.id}
      />
      <img className="dino-img" src={dino} alt="dino" />
      <div
        className={`asteroid-title ${setGradientMob(
          asteroid.isHazardous,
          "asteroid"
        )}`}
      ></div>
      <div className="asteroid-inner-1">
        <div className="asteroid-inner-1-container-1">
          <h2 className="asteroid-inner-1-container-1-title">
            <Link
              className="asteroid-inner-1-container-1-title-link"
              to={`/asteroid/${asterId}`}
            >
              {asteroid.name}
            </Link>
          </h2>

          <div className="asteroid-inner-1-container-1-item">
            <div className="asteroid-inner-1-container-1-item-1">
              <span>Дата</span>
            </div>
            <div className="asteroid-inner-1-container-1-item-2"></div>
            <div className="asteroid-inner-1-container-1-item-3">
              {asteroid.date_short}
            </div>
          </div>

          <div className="asteroid-inner-1-container-1-item">
            <div>
              <span> Расстояние</span>
            </div>
            <div className="asteroid-inner-1-container-1-item-2"> </div>
            <div>
              <span>
                {inLunar
                  ? asteroid.distance_lunar + " лун"
                  : asteroid.distance + " км"}
              </span>
            </div>
          </div>

          <div className="asteroid-inner-1-container-1-item">
            <div>
              <span> Размер </span>
            </div>
            <div className="asteroid-inner-1-container-1-item-2"></div>
            <div>
              <span>{asteroid.size + " м"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="asteroid-inner-2">
        <div className="asteroid-inner-2-container-1">
          <div>Оценка:</div>
          <div className="asteroid-inner-2-container-1-isdanger">
            <span>{asteroid.isHazardous ? "опасен" : "неопасен"}</span>
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
      </div>
    </article>
  );
};

export default Asteroid;
