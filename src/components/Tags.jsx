import React from "react";
import T from "../styles/Tags.module.css";
import { useState } from "react";
export default function Tags(props) {
  const [state, setState] = useState({
    active: false,
  });

  const toggleClass = e => {
    const currentState = state.active;
    props.setTemp(e);
    if (
      props.temperaments.length < 3 &&
      !props.temperaments.includes(e.target.innerText)
    ) {
      setState({ ...state, active: !currentState });
    }
    if (
      props.temperaments.length === 3 &&
      !props.temperaments.includes(e.target.innerText)
    ) {
      setState({ ...state, active: currentState });
    }

    if (props.temperaments.includes(e.target.innerText)) {
      setState({ ...state, active: !currentState });
    }
  };

  return (
    <div className={T.tag}>
      <span
        className={state.active ? T.active : T.tagContainer}
        value={props.name}
        onClick={e => {
          toggleClass(e);
        }}
      >
        {props.name}
      </span>
    </div>
  );
}
