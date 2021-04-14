import React, { useContext, useState } from "react";
import { useAsteroidList } from "./AsteroidProvider";

const DestroyContext = React.createContext();
export const useDestroyService = () => useContext(DestroyContext);

export const DestroyProvider = ({ children }) => {
  const [destroyList, setDestroyList] = useState([]);
  const { getAsteroidById } = useAsteroidList();

  const addAsterToDestroyList = (id) => {
    const aster = getAsteroidById(id);
    if (!aster) return;
    setDestroyList((prev) => [...prev, aster]);
  };

  const removeAsterFromDestroyList = (id) => {
    const newDestroyList = destroyList.filter((aster) => aster.id !== id);
    setDestroyList(newDestroyList);
  };

  const removeAllAstersFromDestroyList = () => {
    setDestroyList([]);
  };

  return (
    <DestroyContext.Provider
      value={{
        destroyList,
        addAsterToDestroyList,
        removeAsterFromDestroyList,
        removeAllAstersFromDestroyList,
      }}
    >
      {children}
    </DestroyContext.Provider>
  );
};
