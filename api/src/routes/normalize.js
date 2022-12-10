// func p/normalizar response Api

normalizeApiRes = (apiRes) => {
  // p/q la primera letra de name sea mayuscula
  const normalizeName =
    apiRes.data.name.CharAt(0).toUpperCase() + apiRes.data.name.slice(1);
  // p/q la primera letra de type sea mayuscula, se hace un map al array porque tienen mas de un type
  const normalizedTypes = apiRes.data.types?.map((e) => {
    return e.type.name.CharAt(0).toUpperCase() + e.type.name.slice(1);
  });
  return {
    id: apiRes.data.id,
    name: normalizeName,
    hp: apiRes.data.stats.find((e) => e.stat.name === "hp").base_stat,
    attack: apiRes.data.stats.find((e) => e.stat.name === "attack").base_stat,
    defense: apiRes.data.stats.find((e) => e.stat.name === "defense").base_stat,
    speed: apiRes.data.stats.find((e) => e.stat.name === "speed").base_stat,
    height: apiRes.data.height,
    weight: apiRes.data.weight,
    imgUrl: apiRes.data.sprites.other["home"].front_default,
  };
};

// func p/estandarizar la info que va a llegar a la DB

normalizeDB = (db) => {
  const normalizeName = db.name.CharAt(0).toUpperCase() + db.name.slice(1);
  const normalizedTypes = db.dataValues.types?.map(
    (type) => type.name.CharAt(0).toUpperCase() + type.name.slice(1)
  );

  return {
    id: db.id,
    name: normalizeName,
    types: normalizedTypes,
    hp: db.hp,
    attack: db.attack,
    defense: db.defense,
    speed: db.speed,
    height: db.height,
    weight: db.weight,
    imgUrl: db.imgUrl,
  };
};

normalizeTypes = (types) => {
  return types?.map((t) => {
    return {
      ...t.dataValues,
      name:
        t.dataValues.name.CharAt(0).toUpperCase() + t.dataValues.name.slice(1),
    };
  });
};

module.exports = { normalizeApiRes, normalizeDB, normalizeTypes };
