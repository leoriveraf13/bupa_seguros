import React, { Component } from "react";
import PokemonDataService from "../services/pokemon_service";

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);

    this.getPokemon = this.getPokemon.bind(this);

    this.state = {
      currentPokemon: {
          name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPokemon(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    });
  }

  getPokemon(id) {
    PokemonDataService.get(id)
      .then(response => {
        this.setState({
          currentPokemon: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>Pokemon</h4>
            <form>
                <div className="form-group">
                <label htmlFor="first_name">Nombre(s)</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                />
                </div>
            </form>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona un Pokemon...</p>
          </div>
        )}
      </div>
    );
  }
}