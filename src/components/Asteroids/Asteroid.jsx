import React from "react";
import { Link } from "react-router-dom";
import { useAsteroidList } from "../../providers/AsteroidProvider";
import { useDestroyService } from "../../providers/DestroyProvider";

const Asteroid = ({ asteroid, inLunar }) => {
  const { addAsterToDestroyList } = useDestroyService();
  const { deleteAsterFromTheMainList } = useAsteroidList();
  return (
    <div>
      <Link to={`/asteroid/${asteroid.id}`}>
        <h2>{asteroid.name}</h2>
      </Link>
      <div>id: {asteroid.id}</div>
      <div>Дата: {asteroid.date}</div>
      {inLunar ? (
        <div>Расстояние (до луны): {asteroid.distance.lunar}</div>
      ) : (
        <div>Расстояние (км): {asteroid.distance.kilometers}</div>
      )}

      <div>Размер(мин) метры: {asteroid.diameter.min_meters}</div>
      <div>Размер(макс) метры: {asteroid.diameter.max_meters}</div>
      <div>{asteroid.isHazardous ? "Опасный" : "Неопасный"}</div>
      <button
        onClick={() => {
          addAsterToDestroyList(asteroid.id);
          deleteAsterFromTheMainList(asteroid.id);
        }}
      >
        На уничтожение
      </button>
    </div>
  );
};

export default Asteroid;
