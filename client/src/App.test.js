import { render } from "@testing-library/react";
import Landing from "./components/Landing";
// import App from "./App"

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Landing tiene un link a home", () => {
  render(<Landing />);
  expect(document.querySelector("a").getAttribute("href")).toBe("/home");
});


// describe("Actions Tests:", () => {
//   // it("debe retornar el mismo type que se pasa por funcion getPokemonsByType", () => {
//   //   expect(getPokemonByType("ground")).toEqual({
//   //     type: "GET_POKEMONS_BY_TYPE",
//   //     payload: "ground",
//   //   });
//   // });

//   it("deberia retornar un payload igual al pasado por parametros en la funcion getPokemonsCreated:", () => {
//     expect(getPokemonsCreated("db")).toEqual({
//       type: "GET_POKEMONS_CREATED",
//       payload: "db",
//     });
//   });
// });
