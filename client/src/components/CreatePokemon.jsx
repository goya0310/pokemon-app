import React from "react";
import { connect, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../actions";
import styles from "../styles/CreatePokemon.module.css";
import pikachu from "../images/pikachu2.png";
import pikachuExito from "../images/pikachuExito.png";
import { setLoadingTrue } from "../actions";
import spinner from "../images/spinner.gif";
import loading from "../images/loading.gif";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import pikachuError from "../images/pikachuError.jpg";

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
  let spinnerLoader = useSelector((state) => state.loadingSpinner);
  const history = useHistory();

  React.useEffect(() => {
    props.getAllTypes();
    props.setLoadingTrue();
  }, [props]);

  let [exito, setExito] = React.useState(false);
  let [error, setError] = React.useState(false);

  let handleChange = (e) => {
    e.preventDefault();
    // usa callback para manejar el estado anterior, [bracket notation p/q tome el name del input y asigna estado a la key el value correspondiente]
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };
  // let dispatch = React.useDispatch() //en vez de usar connect

  let errorAlert = (message) => {
    Swal.fire({
      imageUrl: pikachuError,
      imageHeight: 200,
      title: "¡Error!",
      text: message,
      confirmButtonText: "OK",
    })
  }

  let handleSubmit = (e) => {
    //para que no recargue la pagina
    e.preventDefault();
    console.log(e);
    if (input.name && input.types.length < 3) {
      if (input.imgUrl.length > 0 && checkURL(input.imgUrl) === false) {
        errorAlert("La URL ingresada no corresponde a una imagen");
        return;
      }
      if (input.imgUrl.length === 0) {
        input.imgUrl =
          "https://www.pngall.com/wp-content/uploads/5/Pikachu-PNG-HD-Image.png";
      }

      props.createPokemon(input); // {type: "CREATE_USER", payload: info }
      //con el useDispatch
      // dispatch(createUser(input))
      setError(false);
      setExito(true);
      // limpiar los valores cuando haga click en submit
      setInput({
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
    } else {
      setError(true);
      setExito(false);
    }
  };

  let handleCheckbox = (e) => {
    if (e.target.checked) {
      setInput((state) => {
        return {
          ...state,
          types: [...state.types, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      input.types.splice(input.types.indexOf(e.target.value), 1);
      setInput((state) => {
        return { ...state };
      });
    }
  };

  const reloadPage = () => {
    errorAlert("máximo types superado");
  };

  return (
    <div className={styles.background}>
      {spinnerLoader ? (
        <div className={styles.spinnerloader}>
          <img src={spinner} alt="...spinner" />
          <img src={loading} alt="...loading" className={styles.loading} />
        </div>
      ) : (
        <div className={styles.createGlobal}>
          <div className={styles.create}>
            <div className={styles.header}>
              <h3>Crea tu Pokemon</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.formGlobal}>
                <div className={styles.form}>
                  <label>Name: </label>
                  <input
                    type={"text"}
                    name={"name"}
                    value={input.name}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>HP: </label>
                  <input
                    type={"text"}
                    name={"hp"}
                    value={input.hp}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Attack: </label>
                  <input
                    type={"text"}
                    name={"attack"}
                    value={input.attack}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Defense: </label>
                  <input
                    type={"text"}
                    name={"defense"}
                    value={input.defense}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Speed: </label>
                  <input
                    type={"text"}
                    name={"speed"}
                    value={input.speed}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Height: </label>
                  <input
                    type={"text"}
                    name={"height"}
                    value={input.height}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Weight: </label>
                  <input
                    type={"text"}
                    name={"weight"}
                    value={input.weight}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form}>
                  <label>Image Link: </label>
                  <input
                    type={"text"}
                    name={"imgUrl"}
                    value={input.imgUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <p className={styles.typesCheck}>Elegir máximo 2 types</p>
              <div className={styles.typeContainer}>
                <div className={styles.typesBoxes}>
                  {types?.slice(0, 5).map((type) => {
                    return (
                      <div key={type.id} className={styles.type}>
                        <input
                          type={"checkbox"}
                          id={"checkId"}
                          name={"types"}
                          value={type.name}
                          onChange={(e) => handleCheckbox(e)}
                        />
                        <label>{type.name}</label>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.typesBoxes}>
                  {types?.slice(5, 10).map((type) => {
                    return (
                      <div key={type.id} className={styles.type}>
                        <input
                          type={"checkbox"}
                          id={"checkId"}
                          name={"types"}
                          value={type.name}
                          onChange={(e) => handleCheckbox(e)}
                        />
                        <label>{type.name}</label>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.typesBoxes}>
                  {types?.slice(10, 15).map((type) => {
                    return (
                      <div key={type.id} className={styles.type}>
                        <input
                          type={"checkbox"}
                          id={"checkId"}
                          name={"types"}
                          value={type.name}
                          onChange={(e) => handleCheckbox(e)}
                        />
                        <label>{type.name}</label>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.typesBoxes}>
                  {types?.slice(15, 20).map((type) => {
                    return (
                      <div key={type.id} className={styles.type}>
                        <input
                          type={"checkbox"}
                          id={"checkId"}
                          name={"types"}
                          value={type.name}
                          onChange={(e) => handleCheckbox(e)}
                        />
                        <label>{type.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {input.types.length > 2 && reloadPage()}
              <br />
              <div className={styles.createReset}>
                <input
                  className={styles.createButton}
                  type={"submit"}
                  value={"CREATE"}
                />
              </div>
            </form>
            <div>{error ? <h4>Verificar datos</h4> : null}</div>
          </div>
          <div className={styles.pikachu}>
            {exito ? (
              <img
                src={pikachuExito}
                alt="PikachuExito"
                className={styles.pikachuExito}
              />
            ) : (
              <img src={pikachu} alt="Pikachu" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    createPokemon: (input) => dispatch(createPokemon(input)),
    getAllTypes: () => dispatch(getTypes()),
    setLoadingTrue: () => dispatch(setLoadingTrue()),
  };
}

//null xq' no necesito nada del estado global, si necesito el dispatch
export default connect(null, mapDispatchToProps)(Create);

// si no quiero usar el mapDispatch
// export default connect(null, {createUser})(CreateUser)
