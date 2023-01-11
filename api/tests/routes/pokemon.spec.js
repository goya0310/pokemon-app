/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  id: 25,
  imgUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
  hp: 35,
  attack: 55,
  defense: 40,
  speed: 90,
  height: 4,
  weight: 60,
  createInDb: false,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect((res) => {
      expect(res.status).equal(200);
    }));
  });
});

describe("/pokemons?name=", () => {
  it("GET con coincidencias de query", () =>
    agent.get("/pokemons?name=pikachu").expect((res) => {
      expect(Object.keys(res.body).length).equal(11);
    }));
});
