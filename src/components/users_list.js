import React, { Component } from "react";
import UsersDataService from "../services/users_service";
import { Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUser = this.onChangeSearchUser.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchUser = this.searchUser.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUser: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUser(e) {
    const searchUser = e.target.value;

    this.setState({
      searchUser: searchUser
    });
  }

  retrieveUsers() {
    UsersDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  searchUser() {
    UsersDataService.findByName(this.state.searchUser)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Usuarios</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.first_name} {user.last_name}
                </li>
              ))}
          </ul>
          <Link
                to={"/add"}
                className="badge badge-warning"
              >
                Agregar usuario
              </Link>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>Datos de usuario</h4>
              <div>
                <label>
                  <strong>Nombre(s):</strong>
                </label>{" "}
                {currentUser.first_name}
              </div>
              <div>
                <label>
                  <strong>Apellidos(s):</strong>
                </label>{" "}
                {currentUser.last_name}
              </div>
              <div>
                <label>
                  <strong>Correo:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Fotografía:</strong>
                </label>{" "}
                <img src=
                {currentUser.avatar} 
                alt={`Avatar ${currentUser.first_name}`}/>
              </div>

              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Modificar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona un usuario...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}