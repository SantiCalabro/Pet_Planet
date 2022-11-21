import React from "react";
import Laika from "../statics/laika.jpg";
import L from "../styles/Loading.module.css";

export default function LoadingHome() {
  return (
    <>
      <div className={L.container}>
        <img className={L.laika} src={Laika} alt="" />
      </div>
    </>
  );
}
