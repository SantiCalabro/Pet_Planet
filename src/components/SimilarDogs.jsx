import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showDogs } from "../redux/actions";
import S from "../styles/Similar.module.css";
import { Link } from "react-router-dom";

export default function SimilarDogs(props) {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(showDogs());
  }, [dispatch]);
  const dogs = useSelector(state => state.showDogs);
  const breedFilter = dogs.filter(el => el.breedGroup === props.breed);

  const filtered = breedFilter
    .filter(el => el.id !== Number(props.id))
    .slice(0, 4);

  return (
    <>
      <h4 className={S.title}>{ENG ? "Similar dogs" : "Perros similares"}</h4>
      <div className={S.similarContainer}>
        <div className={S.container}>
          {filtered &&
            filtered.map(el => (
              <Link
                key={el.id}
                to={`/detail/${el.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={S.subContainer}>
                  <div className={S.nameCont}>
                    <h5 className={S.name}>{el.name}</h5>
                  </div>
                  <img className={S.image} src={el.image} alt="" />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
