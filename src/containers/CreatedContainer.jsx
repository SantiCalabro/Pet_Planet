import React from "react";
import Created from "../components/CreatedDogs";
import CrCont from "../styles/createdContainer.module.css";
import dogstronaut from "../statics/dogstronaut.png";
import { useSelector } from "react-redux";
import Error from "./ErrorConnection";

export default function CreatedContainer() {
  const err = useSelector(state => state.error);
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  return (
    <>
      {err == "error" ? (
        <Error />
      ) : (
        <div>
          <div className={CrCont.general}>
            <Created />
            <hr />
            <div className={CrCont.container}>
              <>
                <div className={CrCont.titleContainer}>
                  <h1 className={CrCont.title}>
                    {ENG
                      ? "These are the dogs created so far!"
                      : "Estos son los perros creados hasta ahora!"}
                  </h1>
                </div>
                <div>
                  <p className={CrCont.subtitleContainer}>
                    {ENG ? "Know them all!" : "Conocelos a todos!"}
                  </p>
                </div>
              </>
            </div>
          </div>

          <img src={dogstronaut} alt="" className={CrCont.pic} />
        </div>
      )}
    </>
  );
}
