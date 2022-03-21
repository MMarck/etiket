import Button from "../Button"
import Popup from '../Popup';
import LoginForm from "../LoginForm";
import { Component} from "react";
import './HomeBody.css';


class HomeBody extends Component {

  render(){
    return (
      <div className='homebody'>
        <div className="LoginForm">
          <p>Hola</p>
        </div>
        <div className="info" style={{backgroundImage:'url(/images/fondo-web.png)'}} >
          <p>Hola</p>
        </div>
      </div>
    )
  }
}

export default HomeBody