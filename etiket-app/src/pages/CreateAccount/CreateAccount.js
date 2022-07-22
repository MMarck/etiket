/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { Component, useState } from 'react';
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
          //setMsg(response.message);
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

  handleInput(evt) {
    const value = evt.target.value;

    const rules = {
      minimunReg : /^.{6,}$/,
      upperReg: /^(?=.*?[A-Z]).*$/,
      alphaReg: /^(?=.*?[a-z,0-9]).*$/,
      completeRuleRegex: /^(?=.{6,}$)(?=.*?[a-z,0-9])(?=.*?[A-Z]).*$/
    }

    //validate each rule declare on html document 
    Object.keys(rules).forEach((keyRule) => {
      updateCheckRequirements(rules, keyRule, value)
    })

    //validate the password inpunt and setting a effect 
    updateInputValidation(rules.completeRuleRegex ,value)
  }

  checkInputConfirm(evt) {
    const warning = document.getElementById('passwordWarning')
    const p1 = document.getElementById("password");
    const p2 = evt.target

    if (p1.value != p2.value){
      evt.target.classList.add("invalid");
      evt.target.classList.remove("valid");
      warning.classList.add('warningActivated')
    }
    else{
      evt.target.classList.add("valid");
      evt.target.classList.remove("invalid");
      warning.classList.remove('warningActivated')
    }
  }





  render() {
    //const [msg, setMsg] = useState("");
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
            onInput={(e)=> this.handleInput(e)}
            onChange={(e) => this.handleChange(e, 'password')}
            className="inputText mb-4"
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />

          <input
            className="inputText mb-4"
            type="password"
            placeholder="Confirme su contraseña"
            id="passwordConfirmation" 
            onInput={(e)=>this.checkInputConfirm(e)} 
          />

          <span id = 'passwordWarning' className='warning d-flex justify-content-center'> 
            Las constraseñas no coinciden 
          </span>

          <div id="PasswordRequirements">
            <span id = "minimunReg">
              <div className="check d-none"/>
              <div className="cross"/>
              mínimo 6 caracteres
            </span>

            <span id = "upperReg">
              <div className="check d-none"/>
              <div className="cross"/>
              mínimo una letra en mayúscula
            </span>

            <span id = "alphaReg">
              <div className="check d-none"/>
              <div className="cross"/>
              mínimo un caracter alfanumerico
            </span>

          </div>

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
            <button type="button" className="btn-dark darkButton cursor-pointer">
              Cancelar
            </button>
          </Link>
        </form>

        <hr />

        <div className="signupButton google mx-auto mt-2 small">
          <span className="icon" />
          <span>Inicia sesion con Google</span>
        </div>
        <hr />

        <small>© Copyright Solinal 2021</small>
      </div>
    );
  }
}

export default withRouter(CreateAccount);


const updateCheckRequirements = (rules, keyRule, value) => {
  
  //skip rules without html node elements
  if(!document.querySelector('#' + keyRule)){
    return null
  }

  if (rules[keyRule].test(value)) {
    var check = document.querySelector('#PasswordRequirements #' + keyRule + ' .check')
    var cross = document.querySelector('#PasswordRequirements #' + keyRule + ' .cross')

    check.setAttribute('class', 'check')
    cross.setAttribute('class', 'cross d-none')
  }
  else{
    var check = document.querySelector('#PasswordRequirements #' + keyRule + ' .check')
    var cross = document.querySelector('#PasswordRequirements #' + keyRule + ' .cross')

    check.setAttribute('class', 'check d-none')
    cross.setAttribute('class', 'cross')
  }
}


const updateInputValidation = (rule, value) =>{
  var passwordInput = document.querySelector('input#password')
  var initialClass = "inputText  mb-4"

  if(!value){
    passwordInput.setAttribute('class', initialClass) 
  }else{
    if (rule.test(value)) {
      passwordInput.setAttribute('class', initialClass + ' valid') 
    }
    else{
      passwordInput.setAttribute('class', initialClass + ' invalid') 
    }
  }



}