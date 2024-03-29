import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Tags from "./Tags";
import {
  showDogs,
  showTemperaments,
  showBreeds,
  dogUpdate,
} from "../redux/actions";
import EF from "../styles/EditForm.module.css";
import { useState } from "react";
import SuccessUpdate from "./SuccessUpdate";

export default function EditForm(props) {
  const breeds = useSelector(state => state.showBreeds);
  const dogs = useSelector(state => state.showDogs);
  const dogDetail = useSelector(state => state.dogDetail);
  const id = dogDetail[0].id;
  const temperaments = useSelector(state => state.showTemperaments);
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  const dispatch = useDispatch();
  const breedNames = Object.values(breeds).map(el => el.name);
  const select = new Set(breedNames);

  const unrepeated = Array.from(select).filter(el => el !== "No breed");

  const [disable, setDisable] = useState({
    submit: true,
    tags: false,
    msg: true,
  });
  const [clicks, setClicks] = useState(0);
  const [error, setError] = useState({});
  const initialState = {
    name: "",
    breedGroup: "No breed",
    image: "",
    minYearsOfLife: "",
    maxYearsOfLife: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    temperaments: [],
  };
  const [input, setInput] = useState({
    name: "",
    breedGroup: "No breed",
    image: "",
    minYearsOfLife: "",
    maxYearsOfLife: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    temperaments: [],
  });

  React.useEffect(() => {
    dispatch(showDogs());
    dispatch(showTemperaments());
    dispatch(showBreeds());
  }, [dispatch]);

  function setTemp(e) {
    const select = input.temperaments.find(el => el === e.target.innerText);
    if (select) {
      setClicks(clicks - 1);
      setInput({
        ...input,
        temperaments: input.temperaments.filter(
          el => !el.includes(e.target.innerText)
        ),
      });
      if (clicks < 4) {
        ENG
          ? setError({
              ...error,
              temperament: "",
            })
          : setError({
              ...error,
              temperament: "",
            });
      }
    } else if (input.temperaments.length === 3 && clicks === 3) {
      ENG
        ? setError({
            ...error,
            temperament: "*You can't select more than three temperaments",
          })
        : setError({
            ...error,
            temperament: "*No puedes seleccionar más de tres temperamentos",
          });
    } else if (!select && input.temperaments.length < 3) {
      setClicks(clicks + 1);
      ENG
        ? setError({
            ...error,
            temperament: "",
          })
        : setError({
            ...error,
            temperament: "",
          });
      handleChange(e);
      setInput({
        ...input,
        temperaments: input.temperaments.concat(e.target.innerText),
      });

      if (
        input.name.length > 0 &&
        input.image.length > 0 &&
        input.minYearsOfLife.length > 0 &&
        input.maxYearsOfLife.length > 0 &&
        input.minHeight.length > 0 &&
        input.maxHeight.length > 0 &&
        input.minWeight.length > 0 &&
        input.minWeight.length > 0
      ) {
        setDisable({ ...disable, submit: false });
      }
    }
  }

  function validate(input) {
    const taken = dogs.find(el => el.name === input.name);
    const errors = {};
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexUrl =
      /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/;

    if (!input.name) {
      ENG
        ? (errors.name = "*Ups! Name is required")
        : (errors.name = "*Ups! Se requiere nombre");
    } else if (!regexName.test(input.name)) {
      ENG
        ? (errors.name = "*Name is invalid")
        : (errors.name = "*El nombre es inválido");
    } else if (taken) {
      ENG
        ? (errors.name = "*Ups! This name already exists")
        : (errors.name = "*Ups! Ese nombre ya existe");
    }

    if (!input.image) {
      ENG
        ? (errors.image = "*Image is required")
        : (errors.image = "*Se requiere imagen");
    } else if (!regexUrl.test(input.image)) {
      ENG
        ? (errors.image = "*It must be an URL")
        : (errors.image = "*Debe ser una URL");
    }

    if (!input.minHeight || !input.maxHeight) {
      ENG
        ? (errors.height = "*Height is required")
        : (errors.height = "*Se requiere altura");
    } else if (input.minHeight < 0 || input.maxHeight < 0) {
      ENG
        ? (errors.height = "*Height must be a positive number")
        : (errors.height = "*La altura debe ser un número positivo");
    } else if (
      Number(input.minHeight) > Number(input.maxHeight) ||
      Number(input.minHeight) === Number(input.maxHeight)
    ) {
      ENG
        ? (errors.height = "*Max height must be bigger")
        : (errors.height = "*La altura máxima debe ser mayor");
    }

    if (!input.minWeight || !input.maxWeight) {
      ENG
        ? (errors.weight = "*Weight is required")
        : (errors.weight = "*Se requiere peso");
    } else if (input.minWeight < 0 || input.maxWeight < 0) {
      ENG
        ? (errors.weight = "*Weight must be a positive number")
        : (errors.weight = "*El peso debe ser un número positivo");
    }

    if (
      Number(input.maxWeight) < Number(input.minWeight) ||
      Number(input.minWeight) === Number(input.maxWeight)
    ) {
      ENG
        ? (errors.weight = "*Max Weight must be bigger")
        : (errors.weight = "*El peso máximo debe ser mayor");
    }

    if (!input.minYearsOfLife || !input.maxYearsOfLife) {
      ENG
        ? (errors.yearsOfLife = "*Years of life are required")
        : (errors.yearsOfLife = "*Completá los años de vida");
    } else if (input.minYearsOfLife < 0 || input.maxYearsOfLife < 0) {
      ENG
        ? (errors.yearsOfLife = "*Years of life must be a positive number")
        : (errors.yearsOfLife = "*Los años deben ser números positivos");
    } else if (
      Number(input.minYearsOfLife) > Number(input.maxYearsOfLife) ||
      Number(input.minYearsOfLife) === Number(input.maxYearsOfLife)
    ) {
      ENG
        ? (errors.yearsOfLife = "*Max years of life must be bigger")
        : (errors.yearsOfLife = "*El año máximo debe ser mayor");
    }
    if (
      Number(input.minYearsOfLife) !== parseInt(input.minYearsOfLife, 10) ||
      Number(input.maxYearsOfLife) !== parseInt(input.maxYearsOfLife, 10)
    ) {
      ENG
        ? (errors.yearsOfLife = "*Years of life must be an integer number")
        : (errors.yearsOfLife = "*Los años deben ser números enteros");
    }
    if (!input.temperaments.length) {
      ENG
        ? (errors.temperament = "*Choose at least one temperament")
        : (errors.temperament = "*Elige al menos un temperamento");
    }
    if (input.image.length > 0 && Object.keys(error).length === 0) {
      setDisable({ ...disable, submit: false });
    }
    return errors;
  }
  function handleClear(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(
        el => !el.includes(e.target.innerText.slice(4))
      ),
    });

    setError({
      ...error,
      temperament: "",
    });
    setDisable({
      ...disable,
      tags: false,
    });
    if (input.temperaments.length === 1) {
      setDisable({ ...disable, submit: true });
    }

    setClicks(clicks - 1);
  }

  function clearForm() {
    setInput({ ...initialState });
  }

  function handleValidate(e) {
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(dogUpdate(id, input));

    setDisable({ ...disable, msg: false, submit: true });
    setError({});
    setClicks(0);
    setInput({ ...input, temperaments: [] });
    clearForm();
  }

  return (
    <div>
      {disable.msg === false && (
        <>
          <div className={EF.popUp}>
            <SuccessUpdate />
          </div>
        </>
      )}

      <div className={EF.formContainer}>
        <h1 className={EF.title}>
          {ENG ? "Edit " : "Edita a "} {props.name}
        </h1>
        <form onSubmit={e => handleSubmit(e)} autoComplete="off">
          <div className={EF.data}>
            <div className={EF.NameAndBreed}>
              <div className={EF.NameCont}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={e => handleChange(e)}
                  onBlur={e => handleValidate(e)}
                  placeholder={props.name}
                  className={EF.name}
                />
                {!error.name ? null : (
                  <>
                    <span className={EF.errorName}>{error.name}</span>
                  </>
                )}
              </div>

              <div className={EF.BreedCont}>
                <label>{ENG ? "Breed" : "Raza"}</label>
                <select
                  style={{ width: "150px", marginLeft: "10px" }}
                  id="breedGroup"
                  name="breedGroup"
                  defaultValue={"No Breed"}
                  onChange={e => handleChange(e)}
                  onBlur={e => handleChange(e)}
                >
                  <option value="No breed">No breed</option>
                  {breeds
                    ? unrepeated.map(el => {
                        return <option key={el}>{el}</option>;
                      })
                    : "no breeds"}
                </select>
              </div>
            </div>

            <div className={EF.yearsContainer}>
              <h4>{ENG ? "Years of life" : "Años de vida"}</h4>
              <div className={EF.values}>
                <label>Min.</label>
                <input
                  type="number"
                  id="minYearsOfLife"
                  value={input.minYearsOfLife}
                  name="minYearsOfLife"
                  onChange={e => handleChange(e)}
                  onBlur={e => handleValidate(e)}
                  placeholder={props.minYears}
                />
                <label>Max.</label>
                <input
                  type="number"
                  id="maxYearsOfLife"
                  value={input.maxYearsOfLife}
                  name="maxYearsOfLife"
                  onChange={e => handleChange(e)}
                  onBlur={e => handleValidate(e)}
                  placeholder={props.maxYears}
                />
              </div>
              {!error.yearsOfLife ? null : (
                <div className={EF.errorYearsCont}>
                  <span className={EF.errorYears}>{error.yearsOfLife}</span>
                </div>
              )}
            </div>
            <div className={EF.weightContainer}>
              <h4>{ENG ? "Average weight" : "Peso promedio"}</h4>
              <label>Min.</label>
              <input
                type="number"
                id="minWeight"
                value={input.minWeight}
                name="minWeight"
                onChange={e => handleChange(e)}
                onBlur={e => handleValidate(e)}
                placeholder={props.minWeight}
              />
              <label>Max.</label>
              <input
                type="number"
                id="maxWeight"
                value={input.maxWeight}
                name="maxWeight"
                onChange={e => handleChange(e)}
                onBlur={e => handleValidate(e)}
                placeholder={props.maxWeight}
              />
              {!error.weight ? null : (
                <div className={EF.errorWeightCont}>
                  <span className={EF.errorWeight}>{error.weight}</span>
                </div>
              )}
            </div>
            <div className={EF.heightContainer}>
              <h4>{ENG ? "Average height" : "Altura promedio"}</h4>
              <label>Min.</label>
              <input
                type="number"
                id="minHeight"
                value={input.minHeight}
                name="minHeight"
                onChange={e => handleChange(e)}
                onBlur={e => handleValidate(e)}
                placeholder={props.minHeight}
              />
              <label>Max.</label>
              <input
                type="number"
                id="maxHeight"
                value={input.maxHeight}
                name="maxHeight"
                onChange={e => handleChange(e)}
                onBlur={e => handleValidate(e)}
                placeholder={props.maxHeight}
              />
              {!error.height ? null : (
                <span className={EF.errorHeight}>{error.height}</span>
              )}
            </div>
            <div className={EF.url}>
              <h4>{ENG ? "Upload an image" : "Carga una imagen"}</h4>
              <input
                id="image"
                type="text"
                value={input.image}
                name="image"
                className={EF.inputUrl}
                onChange={e => handleChange(e)}
                onBlur={e => handleValidate(e)}
              />
              {!error.image ? null : (
                <span className={EF.errorUrl}>{error.image}</span>
              )}
            </div>
          </div>

          <label className={EF.label}>
            {ENG
              ? "Choose up to three temperaments"
              : "Elije hasta tres temperamentos"}
          </label>

          <div className={EF.tempContainer}>
            {!error.temperament ? null : (
              <span className={EF.errorTemp}>{error.temperament}</span>
            )}

            <div className={EF.tagsArea}>
              <div className={EF.tags}>
                {temperaments
                  ? temperaments.map(el => {
                      return (
                        <Tags
                          key={el.id}
                          name={el.name}
                          id={el.id}
                          value={el.name}
                          setTemp={setTemp}
                          handleChange={handleChange}
                          handleClear={handleClear}
                          temperaments={input.temperaments}
                          error={error.temperament}
                        />
                      );
                    })
                  : "no tempers"}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={disable.submit === true ? EF.submitBtn : EF.btnActive}
            disabled={disable.submit}
          >
            {ENG ? "Create your dog!" : "Crea tu perro!"}
          </button>
        </form>
      </div>
    </div>
  );
}
