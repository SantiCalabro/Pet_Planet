import React from "react";
import Card from "./card";
import C from "../styles/CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getFiltered } from "../redux/actions";
import notFound from "../statics/notfound.png";
import notDogs from "../statics/notfound.png";
import Pagination from "./Pagination";
export default function Cards() {
  const dogs = useSelector(state => state.showDogs);
  const filtered = useSelector(state => state.filteredDogs);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Object.entries(filtered).length > 2
      ? filtered.slice(indexOfFirstItem, indexOfLastItem)
      : filtered;
  const data = Object.entries(filtered).length; //Cantidad de perros
  React.useState(() => {
    dispatch(getFiltered(dogs));
  }, []);

  return (
    <div>
      <div className={C.container}>
        {Object.values(currentItems)[0] === "Ups! Dog not found!" ? (
          <div className={C.notFound}>
            <img src={notFound} alt="" />
          </div>
        ) : currentItems.length > 0 ? (
          currentItems.map(el => (
            <div key={el.id}>
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
          <img className={C.notDogs} src={notDogs} alt=""></img>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setitemsPerPage={setitemsPerPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        currentItems={currentItems}
        data={data}
        filtered={filtered}
        dogs={dogs}
        minPageNumberLimit={minPageNumberLimit}
        setminPageNumberLimit={setminPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        setmaxPageNumberLimit={setmaxPageNumberLimit}
        pageNumberLimit={pageNumberLimit}
        setpageNumberLimit={setpageNumberLimit}
      />
    </div>
  );
}
