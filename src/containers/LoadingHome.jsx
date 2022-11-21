import React from "react";
import Laika from "../statics/laika.jpg";
import L from "../styles/Loading.module.css";

export default function LoadingHome() {
  return (
    <>
      <div className={L.container}>
        <div className={L.loadingCont}>
          <h3 className={L.loading}>Loading</h3>
        </div>
        <img className={L.laika} src={Laika} alt="" />
      </div>
    </>
  );
}
