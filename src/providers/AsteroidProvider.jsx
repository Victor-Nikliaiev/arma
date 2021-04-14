import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const getPerioud = (lastDate) => {
  lastDate = Date.parse(lastDate);
  let endDate = new Date(lastDate);
  endDate.setDate(endDate.getDate() + 1); // здесь не трогать и не дышать =)
  let startDate = new Date(lastDate);
  startDate.setDate(startDate.getDate() + 1); // единица здесь = один день, если захочешь изменить на больше дней можешь заменить единицу на другое число, но не забывай, что максимальное число дней загрузки за раз которое допускает это API состовляет 6 дней
  return { startDate, endDate };
};

const formateAsteroids = (asters) => {
  let formattedAsters = asters.map((asteroid) => {
    return {
      id: asteroid.id,
      name: asteroid.name,
      date: asteroid.close_approach_data[0].close_approach_date,
      date_mls: asteroid.close_approach_data[0].epoch_date_close_approach,
      distance: {
        kilometers: asteroid.close_approach_data[0].miss_distance.kilometers,
        lunar: asteroid.close_approach_data[0].miss_distance.lunar,
      },
      velocity: {
        km_per_sec:
          asteroid.close_approach_data[0].relative_velocity
            .kilometers_per_second,
        km_per_hour:
          asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
      },
      diameter: {
        min_meters: asteroid.estimated_diameter.meters.estimated_diameter_min,
        max_meters: asteroid.estimated_diameter.meters.estimated_diameter_max,
      },
      isHazardous: asteroid.is_potentially_hazardous_asteroid,
      orbiting_body: asteroid.close_approach_data[0].orbiting_body,
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

const AsteroidContext = React.createContext();
export const useAsteroidList = () => useContext(AsteroidContext);

export const AsteroidProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(getPerioud(new Date()).startDate);
  const [endDate, setEndDate] = useState(getPerioud(new Date()).endDate);
  const [fetching, setFetching] = useState(true);
  const [allAsteroids, setAllAsteroids] = useState([]);

  const [dangerOn, setDangerOn] = useState(false);
  const [inLunar, setInLunar] = useState(false);
  const [filteredAsteroids, setFilteredAsteroids] = useState(() =>
    filterList(allAsteroids, dangerOn)
  );

  useEffect(() => {
    setFilteredAsteroids(filterList(allAsteroids, dangerOn)); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredAsteroids(filterList(allAsteroids, dangerOn));
  }, [allAsteroids, dangerOn]);

  const getAsteroidById = (id) => {
    const aster = filteredAsteroids.find((asteroid) => asteroid.id === id);
    if (aster) {
      return aster;
    }
    return null;
  };

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

          setAllAsteroids((prev) => [...prev, ...formattedAsters]);
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

  const getAsterFullInfoById = (id) => {
    const asteroid = filteredAsteroids.find((aster) => aster.id === id);
    if (!asteroid) return null;

    const dateParams = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const distance = Math.round(asteroid.distance.kilometers);
    const date = new Date(asteroid.date_mls).toLocaleString("ru", dateParams);
    const size = Math.round(
      (asteroid.diameter.max_meters + asteroid.diameter.max_meters) / 2
    );
    const name = asteroid.name;
    const velocity = Math.round(asteroid.velocity.km_per_sec);
    const orbitBody = asteroid.orbiting_body;

    return { distance, date, size, name, velocity, orbitBody };
  };

  const deleteAsterFromTheMainList = (id) => {
    const newFilteredList = filteredAsteroids.filter(
      (asteroid) => asteroid.id !== id
    );
    const newAllAsters = allAsteroids.filter((aster) => aster.id !== id);

    setFilteredAsteroids(newFilteredList);
    setAllAsteroids(newAllAsters);
  };

  return (
    <AsteroidContext.Provider
      value={{
        filteredAsteroids,
        dangerOn,
        inLunar,
        setDangerOn,
        getAsterFullInfoById,
        getAsteroidById,
        deleteAsterFromTheMainList,
        setInLunar,
      }}
    >
      {children}
    </AsteroidContext.Provider>
  );
};
