import React from "react";
import F from "../styles/FilterSection.module.css";
import { getFiltered, showDogs, clearFilter } from "../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import filter from "../statics/filter.png";
import { useState } from "react";

export default function FilterSection() {
  const dogs = useSelector(state => state.showDogs);
  const breeds = useSelector(state => state.showBreeds);
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";

  const temperaments = useSelector(state => state.showTemperaments);
  const dispatch = useDispatch();
  const [breed, setBreed] = useState("");
  const [temp, setTemp] = useState("");
  const breedNames = Object.values(breeds).map(el => el.name);
  const select = new Set(breedNames);
  const unrepeated = Array.from(select);

  function handleSort(e) {
    dispatch(clearFilter());
    var sorted = 0;
    if (e.target.innerText === "A-Z") {
      sorted = dogs.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (e.target.innerText === "Z-A") {
      sorted = dogs.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }
    dispatch(getFiltered(sorted));
  }

  function handleFilter(e) {
    dispatch(clearFilter());

    if (
      (e.target.id === "breed" && temp === "") ||
      (e.target.id === "breed" && temp === "DEFAULT")
    ) {
      dispatch(clearFilter());
      const filtered = dogs.filter(el => el.breedGroup === e.target.value);
      dispatch(getFiltered(filtered));
    } else if (
      (e.target.id === "temp" && breed === "") ||
      (e.target.id === "temp" && breed === "DEFAULT")
    ) {
      dispatch(clearFilter());
      const filtered = dogs.filter(el =>
        el.temperaments.includes(e.target.value)
      );
      dispatch(getFiltered(filtered));
    }
  }

  React.useEffect(() => {
    if (
      breed !== "" &&
      temp !== "" &&
      breed !== "DEFAULT" &&
      temp !== "DEFAULT"
    ) {
      dispatch(clearFilter());
      const filtered = dogs.filter(el => el.breedGroup === breed);
      const both = filtered.filter(el => el.temperaments.includes(temp));

      dispatch(getFiltered(both));
    }
    if (breed === "DEFAULT" && temp !== "") {
      const filtered = dogs.filter(el => el.temperaments.includes(temp));
      dispatch(getFiltered(filtered));
    }

    if (temp === "DEFAULT" && breed !== "") {
      const filtered = dogs.filter(el => el.breedGroup === breed);
      dispatch(getFiltered(filtered));
    }
    if (temp === "DEFAULT" && breed === "DEFAULT") {
      dispatch(getFiltered(dogs));
    }
  }, [breed, temp, dispatch, dogs]);

  return (
    <div>
      <div className={F.container}>
        <img src={filter} className={F.filterLabel} alt="" />
        <form>
          <select
            name="breed"
            id="breed"
            onChange={e => {
              setBreed(e.target.value);
              handleFilter(e);
            }}
            defaultValue={"DEFAULT"}
            className={F.tempSelector}
          >
            <option value="DEFAULT" onChange={() => dispatch(showDogs())}>
              {ENG ? "  Breed Group" : "Raza"}
            </option>
            {unrepeated &&
              unrepeated.map(el => {
                return <option key={el}>{el}</option>;
              })}
          </select>

          <select
            name="temperament"
            id="temp"
            onChange={e => {
              setTemp(e.target.value);
              handleFilter(e);
              console.log(temp, breed);
            }}
            defaultValue={"DEFAULT"}
            className={F.tempSelector}
          >
            <option value="DEFAULT" onChange={() => dispatch(showDogs())}>
              {ENG ? "Temperament" : "Temperamento"}
            </option>
            {temperaments &&
              temperaments.map(el => {
                return <option key={el.id}>{el.name}</option>;
              })}
          </select>
          <p className={F.orderTitle}>
            {ENG ? "Order alphabetically " : "Por orden alfabético"}{" "}
          </p>
          <div className={F.orderBtn}>
            <span className={F.order} onClick={e => handleSort(e)}>
              A-Z
            </span>
            <span className={F.order} onClick={e => handleSort(e)}>
              Z-A
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
