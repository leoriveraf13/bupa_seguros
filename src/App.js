import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/add_user";
import Pokemon from "./components/pokemon";
import PokemonList from "./components/pokemons_list"
import User from "./components/user";
import UserList from "./components/users_list";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/users" className="navbar-brand">
              BUPA seguros
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/pokemon"} className="nav-link">
                  Pokemon
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/users"]} component={UserList} />
              <Route exact path="/pokemon" component={PokemonList} />
              <Route exact path="/add" component={AddUser} />
              <Route path="/users/:id" component={User} />
              <Route path="/pokemon/:id" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
