import React from "react";
import CardStyle from "../styles/Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Card(props) {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";

  return (
    <div>
      <Link to={`/detail/${props.id}`} style={{ textDecoration: "none" }}>
        <div className={CardStyle.container}>
          <div className={CardStyle.imgContainer}>
            {typeof props.id === "string" && (
              <div>
                <span className={CardStyle.label}>
                  {ENG ? "Created" : "Creado"}
                </span>
              </div>
            )}
            <img src={props.image} className={CardStyle.img} alt="" />
          </div>
          <div className={CardStyle.dataContainer}>
            <h4 className={CardStyle.raceTitle}>{props.name}</h4>
            <div className={CardStyle.temperamentContainer}>
              <p className={CardStyle.temperament}>
                {props.temperament !== "No temperaments"
                  ? props.temperament.slice(0, 2) + " "
                  : "No temperaments"}
              </p>
            </div>
          </div>

          <>
            {props.minYearsOfLife && props.maxYearsOfLife ? (
              <p className={CardStyle.life}>
                {ENG ? "Life expectancy: " : "Expectativa de vida: "}
                {props.minYearsOfLife} - {props.maxYearsOfLife}
                {ENG ? " years" : " años"}
              </p>
            ) : (
              <p className={CardStyle.life}>
                {ENG ? "Life expectancy: " : "Expectativa de vida: "}
                {props.minYearsOfLife} {ENG ? " year" : " años"}
              </p>
            )}
          </>
        </div>
      </Link>
    </div>
  );
}
