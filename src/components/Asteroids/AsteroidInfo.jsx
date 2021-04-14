import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";

const AsteroidInfo = () => {
  const { getAsterFullInfoById } = useAsteroidList();
  const { id } = useParams();
  const [asterInfo, setAsterInfo] = useState(null);

  useEffect(() => {
    const asteroidInfo = getAsterFullInfoById(id);
    if (asteroidInfo || !asterInfo) {
      setAsterInfo(asteroidInfo);
    } // eslint-disable-next-line
  }, [getAsterFullInfoById, id]);

  return (
    <>
      {asterInfo && (
        <div>
          <h1>Дополнительная информация: {asterInfo.name}</h1>

          <div>
            <span>Время максимального сближения{"................."}</span>
            <span>{asterInfo.date}</span>
          </div>

          <div>
            <span>Расстояние {"..."}</span>
            <span>{asterInfo.distance} км</span>
          </div>

          <div>
            <span>Размер {"..."}</span>
            <span>{asterInfo.size} м</span>
          </div>

          <div>
            <span>Скорость {"..."}</span>
            <span>{asterInfo.velocity} км/сек</span>
          </div>

          <div>
            <span>Орбита {"..."}</span>
            <span>{asterInfo.orbitBody}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AsteroidInfo;
