import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { backendURL } from '../../config/constants';
import withRouter from '../../tools/withRouter';
import './CreateAccount.css';

/**
 * Vista que renderiza el formulario para crear una cuenta de usuario
 */
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nombre: '',
      apellido: ''
    };
  }

  handleChange(event, state) {
    this.setState({ [state]: event.target.value });
  }

  emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(this.state.email)) {
      console.log('correo valido');
    } else if (!regEx.test(this.state.email) && this.state.email !== '') {
      console.log('correo no es valido');
    }
  };

  register(e) {
    e.preventDefault();
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.nombre === '' ||
      this.state.apellido === ''
    ) {
      alert('Hay campos vacíos');
    } else {
      const jsonData = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.nombre,
        lastName: this.state.apellido
      };

      axios
        .post(`${backendURL}UsersDB`, jsonData)
        .then((response) => {
          alert(response.data.message);
          this.props.navigate('/login');
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error);
          }
        });
    }
  }

  render() {
    return (
      <div className="d-flex flex-column w-50 small">
        <span id="avisoDeIngreso">
          <b>Creación de usuario</b>{' '}
        </span>
        <p>
          <b>Únete, es gratis</b>
        </p>

        <form id="LoginForm" className="w-100" onSubmit={(e) => this.register(e)}>
          <label htmlFor="email">Correo</label>
          <br />
          <input
            value={this.state.email}
            onChange={(e) => this.handleChange(e, 'email')}
            className="inputText  mb-4"
            id="usuario"
            type="email"
            name="correo"
            placeholder="Ingrese su correo"
          />

          <label htmlFor="password">Contraseña</label>
          <br />
          <input
            value={this.state.password}
            onChange={(e) => this.handleChange(e, 'password')}
            className="inputText mb-4"
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />

          <div className="d-flex justify-content-center gap-2">
            <div className="d-flex flex-column">
              <label htmlFor="usuario">Nombre</label>
              <input
                value={this.state.nombre}
                onChange={(e) => this.handleChange(e, 'nombre')}
                className="inputText  mb-4"
                id="nombre"
                type="text"
                name="correo"
                placeholder="Ingrese su nombre"
              />
            </div>

            <div className="d-flex flex-column ">
              <label htmlFor="usuario">Apellido</label>
              <input
                value={this.state.apellido}
                onChange={(e) => this.handleChange(e, 'apellido')}
                className="inputText  mb-4"
                id="apellido"
                type="text"
                name="correo"
                placeholder="Ingrese su apellido"
              />
            </div>
          </div>

          <br />
          <button
            type="submit"
            className="ligthButton w-100 cursor-pointer"
            onClick={this.emailValidation}>
            Crear Usuario
          </button>

          <br />
          <br />
          <Link to="/login" className="w-100">
            <button className="btn-dark darkButton cursor-pointer">Cancelar</button>
          </Link>
        </form>

        <hr />

        <div className="signupButton google mx-auto mt-2 small">
          <span className="icon" />
          <span>Inicia sesion con Google</span>
        </div>

        <div className="signupButton facebook mx-auto mt-2 small">
          <span className="icon" />
          <span>Inicia sesion con Facebook</span>
        </div>

        <hr />

        <small>© Copyright Solinal 2021</small>
      </div>
    );
  }
}

export default withRouter(CreateAccount);
