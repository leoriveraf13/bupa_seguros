import React, { Component } from "react";
import PokemonDataService from "../services/pokemon_service";

export default class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPokemon = this.onChangeSearchPokemon.bind(this);
    this.retrievePokemon = this.retrievePokemon.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePokemon = this.setActivePokemon.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);

    this.state = {
      pokemon: [],
      currentPokemon: null,
      currentIndex: -1,
      searchPokemon: ""
    };
  }

  componentDidMount() {
    this.retrievePokemon();
  }

  onChangeSearchPokemon(e) {
    const searchPokemon = e.target.value;

    this.setState({
        searchPokemon: searchPokemon
    });
  }

  retrievePokemon() {
    console.log(PokemonDataService.getAll);
    PokemonDataService.getAll()
      .then(response => {
        this.setState({
          pokemon: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePokemon();
    this.setState({
      currentPokemon: null,
      currentIndex: -1
    });
  }

  setActivePokemon(pokemon, index) {
    this.setState({
      currentPokemon: pokemon,
      currentIndex: index
    });
  }

  searchPokemon() {
    PokemonDataService.findByName(this.state.searchPokemon)
      .then(response => {
        this.setState({
          pokemon: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPokemon, pokemon, currentPokemon, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Busqueda por nombre"
              value={searchPokemon}
              onChange={this.onChangeSearchPokemon}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPokemon}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Pokemon</h4>

          <ul className="list-group">
            {pokemon &&
              pokemon.map((pokemon, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePokemon(pokemon, index)}
                  key={index}
                >
                  {pokemon.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentPokemon ? (
            <div>
              <h4>Datos del Pokemon</h4>
              <div>
                <label>
                  <strong>Nombre(s):</strong>
                </label>{" "}
                {currentPokemon.name}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona un pokemon...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}