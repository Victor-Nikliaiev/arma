import React from "react";
import Header from "./components/Header";
import Asteroids from "./components/Asteroids/Asteroids";
import Footer from "./components/Footer";
import DestroyBasket from "./components/DestroyBasket";
import { AsteroidProvider } from "./providers/AsteroidProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <AsteroidProvider>
        <Router>
          <Header />
          <Route path="/" exact component={Asteroids} />
          <Route path="/destroy" component={DestroyBasket} />
          <Footer />
        </Router>
      </AsteroidProvider>
    </>
  );
};

export default App;
