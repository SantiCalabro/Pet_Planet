import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreated } from "../redux/actions";
import Card from "./card";
import Cr from "../styles/Created.module.css";
import { Link } from "react-router-dom";
import errorPic from "../statics/404.png";

export default function CreatedDogs() {
  const dispatch = useDispatch();
  const created = useSelector(state => state.created);
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  React.useEffect(() => {
    dispatch(getCreated());
  }, []);

  return (
    <>
      <div className={Cr.cardsContainer}>
        {created.length > 0 ? (
          created.map(el => (
            <div key={el.id} className={Cr.card}>
              <Card
                name={el.name}
                key={el.id}
                image={el.image}
                temperament={
                  typeof el.temperaments[0] === "string"
                    ? el.temperaments
                    : el.temperaments.map(el => el.name)
                }
                id={el.id}
                minYearsOfLife={el.minYearsOfLife}
                maxYearsOfLife={el.maxYearsOfLife}
              />
            </div>
          ))
        ) : (
          <div className={Cr.errorContainer}>
            <img className={Cr.errorPic} src={errorPic} alt="" />
            <h1 className={Cr.title}>
              {ENG
                ? "You haven't posted any new dog yet "
                : "No has creado ningún perro todavía"}
            </h1>
            <Link to="/create">
              <button className={Cr.btn}>
                {ENG ? "Do it now!" : "Hazlo ahora!"}
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
