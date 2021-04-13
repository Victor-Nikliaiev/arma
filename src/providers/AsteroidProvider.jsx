import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const getPerioud = (lastDate) => {
  lastDate = Date.parse(lastDate);
  let endDate = new Date(lastDate);
  let startDate = new Date(lastDate);
  startDate.setDate(endDate.getDate() - 1); // единица здесь = один день, если захочешь изменить на больше дней можешь заменить единицу на другое число, но не забывай, что максимальное число дней загрузки за раз которое допускает это API состовляет 6 дней
  return { startDate, endDate };
};

const formateAsteroids = (asters) => {
  let formattedAsters = asters.map((asteroid) => {
    return {
      id: asteroid.id,
      name: asteroid.name,
      date: asteroid.close_approach_data[0].close_approach_date,
      distance: {
        kilometers: asteroid.close_approach_data[0].miss_distance.kilometers,
        lunar: asteroid.close_approach_data[0].miss_distance.lunar,
      },
      diameter: {
        min_meters: asteroid.estimated_diameter.meters.estimated_diameter_min,
        max_meters: asteroid.estimated_diameter.meters.estimated_diameter_max,
      },
      isHazardous: asteroid.is_potentially_hazardous_asteroid,
    };
  });

  return formattedAsters;
};

const filterList = (list, dangerOn) => {
  const filteredList = list.filter((item) => {
    if (dangerOn && item.isHazardous) {
      return true;
    }
    if (!dangerOn) {
      return true;
    }
    return false;
  });
  return filteredList;
};

const removeDuplicateObjectFromArray = (array, key) => {
  let check = new Set();
  return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
};

const AsteroidContext = React.createContext();
export const useAsteroidList = () => useContext(AsteroidContext);

export const AsteroidProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(getPerioud(new Date()).startDate);
  const [endDate, setEndDate] = useState(getPerioud(new Date()).endDate);
  const [fetching, setFetching] = useState(true);
  const [allAsteroids, setAllAsteroids] = useState([]);

  const [dangerOn, setDangerOn] = useState(false);
  const [filteredAsteroids, setFilteredAsteroids] = useState(() =>
    filterList(allAsteroids, dangerOn)
  );

  useEffect(() => {
    setFilteredAsteroids(filterList(allAsteroids, dangerOn)); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredAsteroids(filterList(allAsteroids, dangerOn));
  }, [allAsteroids, dangerOn]);

  const setPerioud = (startDate) => {
    let period = getPerioud(startDate);
    setStartDate(period.startDate);
    setEndDate(period.endDate);
  };

  const getAsteroids = () => {
    if (fetching) {
      const localStartDate = startDate.toISOString().split("T")[0];
      const localEndDate = endDate.toISOString().split("T")[0];
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${localStartDate}&end_date=${localEndDate}&api_key=UdMlApTLhUthkdPgEV5QLXJ5mOsH2ctu7Ysrq9F7`;

      axios
        .get(url)
        .then((response) => {
          let asters = [];

          Object.values({ ...response.data }.near_earth_objects).forEach(
            (date) => {
              date.forEach((asteroid) => {
                asters = [...asters, asteroid];
              });
            }
          );

          const formattedAsters = formateAsteroids(asters);

          setAllAsteroids((prev) => {
            const arrWirhUniqueItems = removeDuplicateObjectFromArray(
              [...prev, ...formattedAsters],
              "id"
            );
            return arrWirhUniqueItems;
            // let prevStringify = prev.map((item) => {
            //   return JSON.stringify(item);
            // });
            // let formattedAstersStringify = formattedAsters.map((item) =>
            //   JSON.stringify(item)
            // );
            // let newStringifyArr = [
            //   ...prevStringify,
            //   ...formattedAstersStringify,
            // ];
            // let newSet = new Set(newStringifyArr);
            // let uniqueStringifyAsters = [...newSet.values()];
            // let uniqueAsters = uniqueStringifyAsters.map((item) =>
            //   JSON.parse(item)
            // );
            // return uniqueAsters;
          });
          setPerioud(startDate);
        })
        .finally(() => setFetching(false));
    }
  };
  // eslint-disable-next-line
  useEffect(getAsteroids, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      300
    ) {
      setFetching(true);
    }
  };

  return (
    <AsteroidContext.Provider
      value={{ filteredAsteroids, dangerOn, setDangerOn }}
    >
      {children}
    </AsteroidContext.Provider>
  );
};
