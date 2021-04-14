import React from "react";
import DestroyItem from "./DestroyItem";
import { useDestroyService } from "../../providers/DestroyProvider";

const DestroyBasket = () => {
  const { destroyList, removeAllAstersFromDestroyList } = useDestroyService();
  return (
    <div>
      {destroyList.length === 0 && <h1>Нет астероидов для ликвидации</h1>}
      {destroyList.length > 0 && (
        <div>
          {destroyList.map((aster) => {
            return <DestroyItem key={aster.id} asterId={aster.id} />;
          })}
          <div>
            <button onClick={() => removeAllAstersFromDestroyList()}>
              Секретное оружие(уничтожить всё)
            </button>
            <span>Только Брюсу не говорите об этом</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestroyBasket;
