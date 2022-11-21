import React from "react";
import N from "../styles/navBar.module.css";
import Logo from "../statics/Logo.png";
import { Link } from "react-router-dom";
import Linkedin from "../statics/linkedin.png";
import Github from "../statics/github.png";
import { setLanguage } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  const lang = useSelector(state => state.language);
  const ENG = lang === "English";
  const dispatch = useDispatch();

  const setLang = e => {
    dispatch(setLanguage(e.target.innerText));
  };
  return (
    <div>
      <div className={N.container}>
        <Link to="/home">
          <img src={Logo} className={N.logo} alt="" />
        </Link>

        <ul className={N.btnContainer}>
          <Link to="/created" style={{ textDecoration: "none" }}>
            <li className={N.created}>
              {ENG ? "Created dogs" : "Perros creados"}
            </li>
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <li className={N.created}>
              {ENG ? "Upload a dog" : "Crea un perro"}
            </li>
          </Link>
        </ul>
        <li className={N.language} onClick={e => setLang(e)}>
          {ENG ? "Español" : "English"}
        </li>

        <div className={N.contact}>
          <a
            href="https://www.linkedin.com/in/santiago-calabr%C3%B3-5b7354219/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={N.linkedin} src={Linkedin} alt="" />
          </a>
          <a
            href="https://github.com/SantiCalabro"
            target="_blank"
            rel="noreferrer"
          >
            <img className={N.github} src={Github} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
