import LoginForm from "../LoginForm/LoginForm";
import { Component} from "react";
import './HomeBody.css';
import {Link} from 'react-router-dom';


class HomeBody extends Component {

  render(){
    return (
      <div className='homebody'>
        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 flex-shrink-0 w-50">
          
          <img src="./images/solinalLogo.png" alt="logo de solinal" width={'200px'} />

          <span id="avisoDeIngreso"><b>Ingresa a Solinal</b> Etiqueta</span>

          <div className="d-flex flex-column w-50 small">

            <LoginForm/><br/>
            
            <Link to="/ResetPassword" className="w-100">
              <button className="darkButton w-100">¿Olvidé mi contraseña?</button>
            </Link>

            <hr/>

            <Link to="/CreateAccount" className="w-100">
              <button className="ligthButton w-100">Crear Usuario</button>
            </Link>

            <div className='signupButton google mx-auto mt-2 small'>
              <span className="icon"></span>
              <span>Inicia sesion con Google</span>
            </div> 

            <div className='signupButton facebook mx-auto mt-2 small'>
              <span className="icon"></span>
              <span>Inicia sesion con Facebook</span>
            </div>

            <hr/>

            <small>© Copyright Solinal 2021</small>
          </div>
            
        </div>

        <div className="info" style={{backgroundImage:'url(/images/fondo-web.png)'}} >
          <p>Hola</p>
        </div>
      </div>
    )
  }
}

export default HomeBody