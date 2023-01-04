const { Router } = require("express");
const getAllPokemonsOrByName = require("./getAllPokemonsOrByName");
const getPokemonById = require("./getPokemonById");
const createNewPokemon = require("./createNewPokemon");

const router = Router();

router.get("/:idPokemon", getPokemonById);
router.post("/", createNewPokemon);
router.get("/", getAllPokemonsOrByName);

module.exports = router;
