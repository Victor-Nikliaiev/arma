import React from "react";
import Header from "./components/Header";
import Asteroids from "./components/Asteroids/Asteroids";
import Footer from "./components/Footer";
import DestroyBasket from "./components/DestroyBasket/DestroyBasket";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AsteroidInfo from "./components/Asteroids/AsteroidInfo";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <Asteroids />} />
          <Route path="/asteroid/:id" render={() => <AsteroidInfo />} />
          <Route path="/destroy" render={() => <DestroyBasket />} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
