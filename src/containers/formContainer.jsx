import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import { showBreeds, showTemperaments } from "../redux/actions";
import FM from "../styles/formContainer.module.css";
import HeaderCreate from "../components/HeaderCreate";
import Error from "./ErrorConnection";

export default function FormContainer() {
  const dispatch = useDispatch();
  const err = useSelector(state => state.error);
  React.useEffect(() => {
    dispatch(showBreeds());
  }, []);
  React.useEffect(() => {
    dispatch(showTemperaments());
  }, []);

  return (
    <div>
      {err === "error" ? (
        <Error />
      ) : (
        <>
          <div className={FM.box}></div>
          <div className={FM.formContainer}>
            <HeaderCreate />
            <Form />
          </div>
        </>
      )}
    </div>
  );
}
