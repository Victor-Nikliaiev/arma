import "./DestroyBasket.scss";
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
          <div
            className="pre-circle"
            onClick={() => removeAllAstersFromDestroyList()}
          >
            {/* <button onClick={() => removeAllAstersFromDestroyList()}>
              Секретное оружие(уничтожить всё)
            </button>
             */}

            <div className="circle">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="weapon-intro">
            <span>
              Секретное оружие (уничтожить всё) Только Брюсу не говорите
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestroyBasket;
