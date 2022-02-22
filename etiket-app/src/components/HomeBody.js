import Button from "./Button"
import Popup from './Popup';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

function HomeBody() {
  const [isOpenL, setIsOpenL]=useState(false);
  const [isOpenR, setIsOpenR]=useState(false);

  const togglePopupL=()=>{
    setIsOpenL(!isOpenL);
  }

  const togglePopupR=()=>{
    setIsOpenR(!isOpenR);
  }

  return (
    <div className='homebody'>
        <h1>GENERADOR DE PLANTILLAS DE TABLA NUTRICIONAL</h1>
        <div id="lrlabels">
            <div className='login'>
                <h3>¡Inicia sesión para empezar!</h3>
                <Button onClick={togglePopupL} text="INICIAR SESIÓN" />
            </div>
            <div className="register">
                <h3>¿No tienes cuenta? ¡Regístrate ahora!</h3>
                <Button onClick={togglePopupR} text="REGISTRARTE" />
            </div>
        </div>
        {isOpenL && <Popup onClick={togglePopupL} content={
          <LoginForm/>
        }/>}
        {isOpenR && <Popup onClick={togglePopupR} content={
          <RegisterForm/>
        }/>}
    </div>
  )
}

export default HomeBody