import small from "../../svg/small.svg";
import middle from "../../svg/middle.svg";
// import big from "../../svg/big.svg";

import "./AsteroidInfo.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import { useDestroyService } from "../../providers/DestroyProvider";

const AsteroidInfo = () => {
  const { getAsterFullInfoById } = useAsteroidList();
  const {
    getAsterFullInfoById: getAsterFullInfoByIdInDestroyList,
  } = useDestroyService();
  const { id } = useParams();

  const [asterInfo, setAsterInfo] = useState(null);
  let orbitBody;
  if (asterInfo) {
    orbitBody = asterInfo.orbitBody === "Earth" ? "Земля" : asterInfo.orbitBody;
  }

  useEffect(() => {
    console.log(id);
    let asteroidInfo = getAsterFullInfoById(id);
    if (asteroidInfo !== null || !asterInfo) {
      setAsterInfo(asteroidInfo);
    }
    if (!asteroidInfo || !asterInfo) {
      asteroidInfo = getAsterFullInfoByIdInDestroyList(id);
    }
    if (asteroidInfo) {
      setAsterInfo(asteroidInfo);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {asterInfo && (
        <article className="asteroid-info">
          <div className="asteroid-info-bg">
            <img className="asteroid-info-bg-small" src={small} alt="small" />
            <img
              className="asteroid-info-bg-middle"
              src={middle}
              alt="middle"
            />
            <img
              className="asteroid-info-bg-middle2"
              src={middle}
              alt="middle"
            />
          </div>

          <div className="asteroid-info-details">
            <div className="asteroid-info-details-title">
              <p>Дополнительная информация к {asterInfo.name}: </p>
            </div>
            <div className="asteroid-info-details-line">
              <div>
                <span>Время максимального сближения </span>
              </div>
              <div className="asteroid-info-details-line-space"></div>
              <div>
                <span>{asterInfo.date}</span>
              </div>
            </div>

            <div className="asteroid-info-details-line">
              <div>
                <span>Расстояние</span>
              </div>
              <div className="asteroid-info-details-line-space"></div>
              <div>
                <span>{asterInfo.distance} км</span>
              </div>
            </div>

            <div className="asteroid-info-details-line">
              <div>
                <span>Размер</span>
              </div>
              <div className="asteroid-info-details-line-space"></div>
              <div>
                <span>{asterInfo.size} м</span>
              </div>
            </div>

            <div className="asteroid-info-details-line">
              <div>
                <span>Скорость</span>
              </div>
              <div className="asteroid-info-details-line-space"></div>
              <div>
                <span>{asterInfo.velocity} км/сек</span>
              </div>
            </div>

            <div className="asteroid-info-details-line">
              <div>
                <span>Орбита</span>
              </div>
              <div className="asteroid-info-details-line-space"></div>
              <div>
                <span>{orbitBody}</span>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default AsteroidInfo;
