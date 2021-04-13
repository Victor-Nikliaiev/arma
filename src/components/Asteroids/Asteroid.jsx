import React from "react";

const Asteroid = ({ asteroid, inLunar }) => {
  return (
    <div>
      <h2>{asteroid.name}</h2>
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
      <button>На уничтожение</button>
    </div>
  );
};

export default Asteroid;
