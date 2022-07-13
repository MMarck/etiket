/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { backendURL } from '../../config/constants';
import withRouter from '../../tools/withRouter';
import './CreateAccount.css';
import $ from 'jquery';

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

  handleInput(evt) {
    const value = evt.target.value;
    const p2 = document.getElementById("p2");
  
    if (value.value != p2.value) p2.classList.add("invalid");
    p2.classList.remove("valid");
    const completeRuleRegex = /^(?=.{6,}$)(?=.*?[a-z,0-9,A-Z]).*$/;
    const minreg = /^.{8,}$/;
    const upreg = /^(?=.*?[A-Z]).*$/;
    const lowreg =/^(?=.*?[a-z]).*$/;
    const numreg =/^(?=.*?[0-9]).*$/;
    const spreg =/^(?=.*?\W).*$/;


    const rules = {
      minimunReg : /^.{6,}$/,
      upperReg: /^(?=.*?[A-Z]).*$/,
      alphaReg: /^(?=.*?[a-z,0-9]).*$/,
      completeRuleRegex: /^(?=.{6,}$)(?=.*?[a-z,0-9])(?=.*?[A-Z]).*$/
    }

    // Verification on html requirements declared
    Object.keys(rules).forEach((keyRule) => {
      updateCheckRequirements(rules, keyRule, value)
    })

    //verification to set a shadow on the input
    updateInputValidation(rules.completeRuleRegex ,value)


    
    /* var requirementsArray = [...document.getElementById('PasswordRequirements').childNodes]
    requirementsArray.forEach( (node) => {
      console.log(node)

      var elements = [...node.childNodes]
      elements.forEach( (element) => { 
        if(element.className){
          if(element.className.includes('check'))
            console.log(element)
        }
        


      }) 
      

      //console.log([...node.childNodes].filter( (element) => {return element.className.includes('check')}))
      //console.log([...node.childNodes][0].className.includes('check'))
      //node.childNodes.forEach((child)=>{console.log(child)})
    })*/


    /* 
          
    if (pwdRegex.test(value.trim())) {
      evt.target.classList.add("valid");
      evt.target.classList.remove("invalid");
      document.getElementById("p2").disabled = false;
    } else {
      evt.target.classList.add("invalid");
      evt.target.classList.remove("valid");
      document.getElementById("p2").disabled = true;
       
    }
    if (minreg.test(value.trim())) {
      console.log($('#min8 .icons .x'))
      
       $('#min8 .icons .x').css('visibility', 'hidden');
       $('#min8 .icons .check').css('visibility', 'visible');
   
    } else {
        $('#min8 .icons .x').css('visibility', 'visible');
        $('#min8 .icons .check').css('visibility', 'hidden');
      
    }
    if (upreg.test(value.trim())) {
      $('#atUp .icons .x').css('visibility', 'hidden');
      $('#atUp .icons .check').css('visibility', 'visible');
      
    } else {
      $('#atUp .icons .x').css('visibility', 'visible');
      $('#atUp .icons .check').css('visibility', 'hidden');
      
    }
    if (numreg.test(value.trim())) {
      $('#atNum .icons .x').css('visibility', 'hidden');
      $('#atNum .icons .check').css('visibility', 'visible');
      
    } else {
      $('#atNum .icons .x').css('visibility', 'visible');
      $('#atNum .icons .check').css('visibility', 'hidden');
      
    }
    
    if (lowreg.test(value.trim())) {
      $('#atLow .icons .x').css('visibility', 'hidden');
      $('#atLow .icons .check').css('visibility', 'visible');
      
    } else {
      $('#atLow .icons .x').css('visibility', 'visible');
      $('#atLow .icons .check').css('visibility', 'hidden');
    }
    
    if (spreg.test(value.trim())) {
      $('#atSp .icons .x').css('visibility', 'hidden');
      $('#atSp .icons .check').css('visibility', 'visible');
      
    } else {
      $('#atSp .icons .x').css('visibility', 'visible');
      $('#atSp .icons .check').css('visibility', 'hidden');
      
    } */
    
    if (!value) {
      evt.target.classList.remove("invalid");
    }
  }
  handleInputConfirm(evt) {
    const value = document.getElementById("p1");
    if (value.value == "") alert("Please");
  
    if (!value) {
      evt.target.classList.remove("invalid");
    }
  }
  checkInputConfirm(evt) {
    const value = document.getElementById("p1");
    if (value.value != evt.target.value) {
      evt.target.classList.add("invalid");
      evt.target.classList.remove("valid");
    } else {
      evt.target.classList.add("valid");
      evt.target.classList.remove("invalid");
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
            name="ConfirmPassword"
            placeholder="Confirme su contraseña"
            id="p2" 
             onInput={(e)=>this.checkInputConfirm(e)} 
          />

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