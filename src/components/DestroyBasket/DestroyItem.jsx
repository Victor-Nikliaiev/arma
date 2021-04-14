import React from "react";
import { useDestroyService } from "../../providers/DestroyProvider";

const DestroyItem = ({ aster }) => {
  const { removeAsterFromDestroyList } = useDestroyService();

  return (
    <div className="asterToDestroy" style={{ marginBottom: "1rem" }}>
      <div>Имя: {aster.name}</div>
      <div>Дата: {aster.date}</div>
      <div>Расстояние (до луны): {aster.distance.lunar}</div>
      <div>Расстояние (км): {aster.distance.kilometers}</div>
      <div>Размер(мин) метры: {aster.diameter.min_meters}</div>
      <div>Размер(макс) метры: {aster.diameter.max_meters}</div>
      <div>{aster.isHazardous ? "Опасный" : "Неопасный"}</div>
      <div>
        <button onClick={() => removeAsterFromDestroyList(aster.id)}>
          Вызвать бригаду Брюса
        </button>
      </div>
    </div>
  );
};

export default DestroyItem;
