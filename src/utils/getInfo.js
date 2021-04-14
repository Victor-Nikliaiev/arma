export const provideFullInfoById = (id, list) => {
  const asteroid = list.find((aster) => aster.id === id);
  if (!asteroid) return null;

  const formatedName = (name) => {
    const reg = /\((.+)\)/;
    if (reg.test(name)) {
      name = name.match(reg)[1];
      return name;
    }
    return name;
  };

  const dateParams = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };

  const dateShortParams = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  // ===========
  // Variables
  // ===========

  const distance = Math.round(asteroid.distance.kilometers);
  const distance_lunar = Math.round(asteroid.distance.lunar);
  const date = new Date(asteroid.date_mls).toLocaleString("ru", dateParams);
  const date_short = new Date(asteroid.date_mls).toLocaleString(
    "ru",
    dateShortParams
  );
  const size = Math.round(
    (asteroid.diameter.max_meters + asteroid.diameter.max_meters) / 2
  );

  const name = formatedName(asteroid.name);
  const isHazardous = asteroid.isHazardous;
  const velocity = Math.round(asteroid.velocity.km_per_sec);
  const orbitBody = asteroid.orbiting_body;

  return {
    id,
    distance,
    distance_lunar,
    date,
    date_short,
    isHazardous,
    size,
    name,
    velocity,
    orbitBody,
  };
};
