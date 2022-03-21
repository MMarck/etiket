import Button from "../Button"
import Popup from '../Popup';
import LoginForm from "../LoginForm/LoginForm";
import { Component} from "react";
import './HomeBody.css';
import {Link} from 'react-router-dom';


class HomeBody extends Component {

  render(){
    return (
      <div className='homebody'>
        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 flex-shrink-0 w-50">
          
          <img src="./images/solinalLogo.png" width={'200px'} />

          <span id="avisoDeIngreso"><b>Ingresa a Solinal</b> Etiqueta</span>

          <LoginForm/>

        </div>

        <div className="info" style={{backgroundImage:'url(/images/fondo-web.png)'}} >
          <p>Hola</p>
        </div>
      </div>
    )
  }
}

export default HomeBody