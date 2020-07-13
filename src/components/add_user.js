import React, { Component } from "react";
import UsersDataService from "../services/users_service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
        data: {
            name: "",
            job: ""
        }
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value
    });
  }

  saveUser() {
    var data = {
        name: this.state.name,
        job: this.state.job
    };

    UsersDataService.create(data)
      .then(response => {
        this.setState({
            name: response.data.name,
            job: response.data.job
        });
        window.alert("El usuario ha sido creado");
        this.props.history.push('/users');
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
        name: "",
        job: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>El registro se ha realizado con éxito!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nombre(s)</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
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
                value={this.state.job}
                onChange={this.onChangeJob}
                name="job"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Aceptar
            </button>
          </div>
        )}
      </div>
    );
  }
}