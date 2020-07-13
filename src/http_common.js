import axios from "axios";

export const usersClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-type": "application/json"
  }
});

export const pokemonClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
      "Content-type": "application/json"
    }
  });