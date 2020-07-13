import { pokemonClient } from "../http_common";

class PokemonDataService {
  getAll() {
      console.log(pokemonClient);
    return pokemonClient.get("/pokemon");
  }

  get(id) {
    return pokemonClient.get(`/pokemon/${id}`);
  }

  findByName(name) {
    return pokemonClient.get(`/pokemon?name=${name}`);
  }
}

export default new PokemonDataService();