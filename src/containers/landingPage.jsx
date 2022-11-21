import React from "react";
import { Link } from "react-router-dom";
// import btn from "../statics/click.png";
import mainImage from "../statics/pugstronaut.jpg";
import L from "../styles/landingPage.module.css";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/actions";

export default function LandingPage() {
  const dispatch = useDispatch();

  const handleLang = e => {
    dispatch(setLanguage(e.target.innerText));
  };
  return (
    <>
      <div className={L.background}>
        <div className={L.imageContainer}>
          <img src={mainImage} className={L.image} alt="" />
        </div>
        <p className={L.subtitle}>
          Choose your language and join us in this spacial trip
        </p>
      </div>
      <div className={L.btnContainer}>
        <div className={L.container}>
          <Link to="/home">
            {/* <img src={btn} className={L.btn} alt="" /> */}
            <button onClick={e => handleLang(e)} className={L.spanish}>
              Spanish
            </button>
          </Link>
          <Link to="/home">
            {/* <img src={btn} className={L.btn} alt="" /> */}
            <button onClick={e => handleLang(e)} className={L.english}>
              English
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
