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
      default: 50,
    },
    attack: {
      type: DataTypes.INTEGER,
      default: 50,
    },
    defense: {
      type: DataTypes.INTEGER,
      default: 50,
    },
    speed: {
      type: DataTypes.INTEGER,
      default: 50,
    },
    height: {
      type: DataTypes.INTEGER,
      default: 5,
    },
    weight: {
      type: DataTypes.INTEGER,
      default: 50,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
  });
};
