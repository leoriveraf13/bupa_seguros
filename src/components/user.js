import React, { Component } from "react";
import UsersDataService from "../services/users_service";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeJob = this.onChangeJob.bind(this);

        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
        currentUser: {
            id: null,
            name: "",
            job: ""
        },
        message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
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

    onChangeJob(e) {
        const job = e.target.value;

        this.setState(function(prevState) {
        return {
            currentUser: {
            ...prevState.currentUser,
            job: job
            }
        };
        });
    }

    getUser(id) {
        UsersDataService.get(id)
        .then(response => {
            this.setState({
            currentUser: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateUser() {
        UsersDataService.update(
        this.state.currentUser.id
        )
        .then(response => {
            console.log(response.data);
            window.alert("Se han actualizado los datos del usuario");
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteUser() {    
        UsersDataService.delete(this.state.currentUser.id)
            .then(response => {
                window.alert("El usuario ha sido eliminado");
                console.log(response.data);
                this.props.history.push('/users')
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
            <h4>Usuario</h4>
            <form>
              
                <div className="form-group">
                <label htmlFor="name">Nombre(s)</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={currentUser.name}
                    onChange={this.onChangeName}
                    name="name"
                />
                </div>

                <div className="form-group">
                <label htmlFor="job">Trabajo</label>
                <input
                    type="text"
                    className="form-control"
                    id="job"
                    required
                    value={currentUser.job}
                    onChange={this.onChangeJob}
                    name="job"
                />
                </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona un usuario...</p>
          </div>
        )}
      </div>
    );
  }
}