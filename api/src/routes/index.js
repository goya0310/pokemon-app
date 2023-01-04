const { Router } = require("express");
const routeForPokemons = require("./routeForPokemons");
const routeForTypes = require("./routeForTypes")

const router = Router();

router.use("/types", routeForTypes);
router.use("/pokemons", routeForPokemons)

module.exports = router;
