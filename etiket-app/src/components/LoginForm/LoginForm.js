/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { backendURL } from '../../config/constants';
import './LoginForm.css';


/**
 * Formulario de inicio de sesion
 */
function LoginForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCookies = (accessToken, refreshToken) => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
  };

  function login(e) {
    e.preventDefault();
    const jsonData = {
      email,
      password
    };
    const axiosLogin = axios.create();
    axiosLogin
      .post(`${backendURL}UsersDB/login`, jsonData)
      .then((response) => {
        console.log(response)
        handleCookies(response.data.accessToken, response.data.refreshToken);
        navigate('/');
      })
      .catch((error) => {
        alterNotification('UserWarning', 'enable')
        //alterValidation('Error', 'enable')
        if (error.response.status == 409) {
          setError(error.response.data.message);
        } else if (error.response) {
          alert(error.response.data.error.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error);
        }
      });
  }

  return (
    <div className="d-flex flex-column w-50 small">
      <span id="avisoDeIngreso">
        <b>Ingresa a Solinal</b> Etiqueta
      </span>

      <span id = 'UserWarning' className='warning'> Usuario o contraseña incorrecta </span>

      <form id="LoginForm" className="w-100" onSubmit={(e) => login(e)}>
        <label htmlFor="usuario">Usuario</label>
        <br />
        <input
          className="inputText  mb-4"
          value={email}
          id="usuario"
          type="text"
          name="correo"
          placeholder="Ingrese su usuario"
          onChange={(e) => {setEmail(e.target.value); alterNotification('UserWarning')}}
        />

        <br />
        <label htmlFor="password">Contraseña</label>
        <br />
        <input
          className="inputText mb-4"
          value={password}
          type="password"
          id="password"
          name="password"
          placeholder="Ingrese su contraseña"
          onChange={(e) => {setPassword(e.target.value); alterNotification('UserWarning')}}
        />

        <br />
        {error && <div className="error_msg">{error}</div>}
        <button type="submit" className="ligthButton">
          Iniciar sesión
        </button>
      </form>

      <br />
      <Link to="/login/resetPassword" className="w-100">
        <button type="button" className="btn-dark darkButton w-100">
          ¿Olvidé mi contraseña?
        </button>
      </Link>

      <hr />

      <Link to="/login/createAccount" className="w-100">
        <button type="button" className="ligthButton w-100">
          Crear Usuario
        </button>
      </Link>

      <div className="signupButton google mx-auto mt-2 small">
        <span className="icon" />
        <span>Inicia sesion con Google</span>
      </div>

      {/* <div className='signupButton facebook mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div> */}

      <hr />

      <small>© Copyright Solinal 2021</small>
    </div>
  );
}

export default LoginForm;


/**
 * Function to set/unset classnames on text to control 
 * notification notificacion
 * @param {String} id text 
 * @param {String} action to set the atributes pass "enable", to un set pass ''
 */
const alterNotification = (id, action)=>{
  var warning = document.getElementById(id)
  if (action == 'enable'){
    warning.className = 'warning warningActivated'
  }
  else{
    warning.className = 'warning'
  }
}