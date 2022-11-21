import React from "react";
import E from "../styles/Error.module.css";
import errorGif from "../statics/floating.gif";
import ship from "../statics/ship.png";
import { Link } from "react-router-dom";
import errorBowl from "../statics/404.png";
import { useSelector } from "react-redux";

export default function Error() {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  return (
    <div>
      <img src={errorBowl} className={E.errorBowl} alt="" />
      <div className={E.container}>
        <p className={E.sentence}>
          {ENG ? "Seems you're lost!" : "Parece que te perdiste!"}
        </p>
      </div>
      <Link to="/home">
        <span className={E.button}>
          {ENG ? "Return to the ship" : " Regresa a la nave"}
        </span>
      </Link>
      <div className={E.imgContainer}>
        <img className={E.ship} src={ship} alt="" />
        <img className={E.dog} src={errorGif} alt="" />
      </div>
    </div>
  );
}
