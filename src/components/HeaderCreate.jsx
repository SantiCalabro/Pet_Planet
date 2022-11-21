import React from "react";
import H from "../styles/HeaderCreate.module.css";
import { useSelector } from "react-redux";

export default function CreatedDog(props) {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  return (
    <div>
      <hr />
      <div className={H.container}>
        <h1>{ENG ? "Upload your buddy!" : "Sube tu perro a la web!"}</h1>
        <p className={H.subtitle}>
          {ENG
            ? "Let the universe know who your best friend is"
            : "Haz que el universo conozca a tu mejor amigo"}
        </p>
      </div>
    </div>
  );
}
