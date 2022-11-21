import "./App.css";
import React from "react";
import LandingPage from "./containers/landingPage";
import Home from "./containers/Home";
import NavBar from "./components/NavBar";
import DogDetail from "./containers/DogDetail";
import FormContainer from "./containers/formContainer";
import CreatedDog from "./containers/CreatedContainer";
import ErrorPage from "./containers/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./containers/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/created" component={CreatedDog} />
          <Route exact path="/create" component={FormContainer} />
          <Route exact path="/detail/:idRaza" component={DogDetail} />
          <Route path={"*"} component={ErrorPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
