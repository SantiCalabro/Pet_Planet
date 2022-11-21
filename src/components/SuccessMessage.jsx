import React from "react";
import successPic from "../statics/success.png";
import { Link } from "react-router-dom";
import S from "../styles/Success.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SuccessMessage() {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";

  return (
    <>
      <div className={S.btnCont}>
        <Link to="/created">
          <p className={S.createdBtn}>
            {ENG ? "Visit your new friends" : "Visita a tus nuevos amigos"}
          </p>
        </Link>
        <Link to="/home">
          <p className={S.btn}>
            {ENG ? "Return to the ship" : "Regresar a la nave"}
          </p>
        </Link>{" "}
      </div>
      <img className={S.pic} src={successPic} alt="" />
      <div className={S.full}></div>
    </>
  );
}
