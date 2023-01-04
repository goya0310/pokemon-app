import React from "react";
import { connect, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../actions";


// Falta que se resetee solo checkbox

// si uso connect puedo poner props
export function Create(props) {
  let [input, setInput] = React.useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 5,
    weight: 50,
    types: [],
    imgUrl: "",
  });

  const types = useSelector((state) => state.types);
  React.useEffect(()=> {
    props.getAllTypes()
  },[props])

  let [exito, setExito] = React.useState(false);
  let [error, setError] = React.useState(false);

  let handleChange = (e) => {
    e.preventDefault();
    // usa callback para manejar el estado anterior, [bracket notation p/q tome el name del input y asigna estado a la key el value correspondiente]
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

// let dispatch = React.useDispatch() //en vez de usar connect

  let handleSubmit = (e) => {
    //para que no recargue la pagina
    e.preventDefault();
    console.log(e)
    if(input.name && input.types.length < 3){

      props.createPokemon(input) // {type: "CREATE_USER", payload: info }
      //con el useDispatch
      // dispatch(createUser(input))  
      setError(false)
      setExito(true)
      // limpiar los valores cuando haga click en submit
      setInput({ name: "",
      hp: 50,
      attack: 50,
      defense: 50,
      speed: 50,
      height: 5,
      weight: 50,
      types: [],
      imgUrl: "",
    })

    } else{
      setError(true)
      setExito(false)
    }
  }

  let handleCheckbox = (e) => {
    if(e.target.checked){
      setInput((state) => {
        return {
          ...state,
          types: [...state.types, e.target.value]
        }
      })
    }
  }

  return (
    <React.Fragment>
      <div>CREATE YOUR POKEMON</div>
      <br />
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type={"text"}
            name={"name"}
            value={input.name}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>HP</label>
          <input
            type={"text"}
            name={"hp"}
            value={input.hp}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
        <label>Attack</label>
          <input
            type={"text"}
            name={"attack"}
            value={input.attack}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
        <label>Defense</label>
          <input
            type={"text"}
            name={"defense"}
            value={input.defense}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Speed</label>
          <input
            type={"text"}
            name={"speed"}
            value={input.speed}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Heigth</label>
          <input
            type={"text"}
            name={"height"}
            value={input.height}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Weigth</label>
          <input
            type={"text"}
            name={"weight"}
            value={input.weight}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>ImageUrl</label>
          <input
            type={"text"}
            name={"imgUrl"}
            value={input.imgUrl}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          {types?.map((type)=>{
            return (
              <div key={type.id}>
                <input 
                type={"checkbox"}
                id={"checkId"}
                name={"types"}
                value={type.name} 
                onChange ={(e) => handleCheckbox(e)}
                />
                <label>{type.name}</label>
              </div>
            )
          })}
        </div>
        {input.types.length > 2 && <p>Elegir máximo 2 tipos</p>}
        <input type={'reset'} value={'RESET'} />
        <input type={'submit'} value={'CREATE'} />
      </form>

      {exito ? <h2>Pokemon Creado con Exito</h2> : null}
      {error ? <h2>Faltan campos por completar</h2> : null}
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch){
    return {
        createPokemon: (input) => dispatch(createPokemon(input)),
        getAllTypes: () => dispatch(getTypes())
    }
}


//null xq' no necesito nada del estado global, si necesito el dispatch
export default connect(null, mapDispatchToProps)(Create)

// si no quiero usar el mapDispatch
// export default connect(null, {createUser})(CreateUser)
