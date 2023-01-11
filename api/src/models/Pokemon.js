const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      // UUID: identificador unico universal
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    // para poder filtrar por creados en base de datos
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
