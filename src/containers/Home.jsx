import React from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import FilterSection from "../components/FilterSection";
import {
  showDogs,
  showTemperaments,
  showBreeds,
  getFiltered,
} from "../redux/actions";
import H from "../styles/Home.module.css";
import sidePic from "../statics/astronaut.png";
import barkSound from "../statics/bark.mp3";
import createBtn from "../statics/createBtn.png";
import globe from "../statics/globe.png";
import LoadingHome from "./LoadingHome";
import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";
import { useState } from "react";
import Error from "./ErrorConnection";

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.showDogs);
  const err = useSelector(state => state.error);
  const lang = useSelector(state => state.language);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const ENG = lang === "English";

  React.useEffect(() => {
    dispatch(showDogs());
    dispatch(showTemperaments());
    dispatch(showBreeds());
    setLoading(false);
  }, [dispatch]);

  var audio = new Audio(barkSound);

  function handleClick() {
    setActive(true);
    audio.play();
  }

  function handleSearch(e) {
    const filter = dogs.filter(
      el =>
        el.name && el.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const msg = { msg: "Ups! Dog not found!" };
    if (filter.length > 0) {
      dispatch(getFiltered(filter));
    } else {
      dispatch(getFiltered(msg));
    }
  }
  return (
    <div className={H.general}>
      <hr />
      {err === "error" ? (
        <Error />
      ) : !dogs.length ? (
        <div className={H.loadingContainer}>
          <LoadingHome />
        </div>
      ) : (
        <div>
          <div className={H.picPointer} onClick={() => handleClick()}></div>
          <div
            className={active === true ? H.hidden : H.globe}
            onClick={() => handleClick()}
          >
            {ENG ? (
              <h3 className={active === true ? H.hidden : H.globeMsg}>
                Click me!
              </h3>
            ) : (
              <h3 className={active === true ? H.hidden : H.globeMsg}>
                Clickeame!
              </h3>
            )}
            <img className={H.globe} src={globe} alt="" />
          </div>

          <img src={sidePic} alt="" className={H.sidePic} />

          <div>
            <div className={H.SearchBar}>
              <SearchBar handleSearch={handleSearch} />
            </div>
            <Link to="/create">
              <img src={createBtn} alt="" className={H.createBtn} />
            </Link>
            <Cards />
            <FilterSection />
          </div>
        </div>
      )}
    </div>
  );
}
