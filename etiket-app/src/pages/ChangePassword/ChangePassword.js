/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './ChangePassword.css';

/*
 *   Vista para hacer el cambio de contraseña
 */
export default function ChangePassword() {
  
  // Variables
  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [visibility, setVisibility] = useState(false);
  const [newVisibility, setNewVisibility] = useState(false);

  // Functions
  const onInputPassword = () => {
    setVisibility(prevState => !prevState);
  }

  const onInputNewPassword = () => {
    setNewVisibility(prevState => !prevState);
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(event);
  }
  

  const validateInput = (event) => {
    
    const { name, value } = event.target;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&\*])(?=.{6,})");

    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Ingresa la nueva contraseña.";
          } else if (input.password.length && value.length < 6 ) {
            stateObj[name] = "La contraseña debe tener mínimo 6 caracteres.";
          } else if ( !strongRegex.test( event.target.value ) ) {
            stateObj[name] = "La contraseña debe tener mínimo una letra mayúscula, una letra minúscula y un cáracter especial.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Las contraseñas no son iguales.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
  
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Por favor confirma la contraseña.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Las contraseñas no son iguales.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  }

  return (
    <div className="columnContainer w-50">
      <h4>
        <b>Introduzca su nueva contraseña</b>
      </h4>
      <br />

      <div className="rounded-square mt-5 w-75" style={{ margin: "0px auto" }}>
        <form className="w-100">
          <label>Nueva contraseña</label>
          <br />
          <input
            className="inputText ligth-input mb-4 w-100"
            id="password"
            type={
              visibility ? "text":"password"
            }
            name="password"
            placeholder='Ingresa la nueva contraseña'
            value={ input.password }
            onChange={ onInputChange }
            onBlur={ validateInput }
          />
          <i className='btn-visibility' onClick={ onInputPassword }> 
              { visibility? <AiOutlineEyeInvisible />:
                  <AiOutlineEye/>
              }
          </i>
          { error.password && <span className='err'>{ error.password }</span>}
          <br />
          <label className='mt-4'>Verifica la nueva contraseña</label>
          <br />
          <input
            className="inputText ligth-input mb-4 w-100"
            id="confirmPassword"
            type={
              newVisibility ? "text":"password"
            }
            name="confirmPassword"
            placeholder='Confirma la nueva contraseña'
            value={ input.confirmPassword }
            onChange={ onInputChange }
            onBlur={ validateInput }
          />
          <i className='btn-visibility' onClick={ onInputNewPassword }> 
              { newVisibility? <AiOutlineEyeInvisible />:
                  <AiOutlineEye/>
              }
          </i>
          { error.confirmPassword && <span className='err'>{ error.confirmPassword }</span>}
        </form>
      </div>

      
        <button
          className=" btn-secondary darkButton fw-bolder p-2 my-4"
          style={{ width: "fit-content" }}
        >
          ACTUALIZAR CONTRASEÑA
        </button>
      
      <footer>
        <small>© Copyright Solinal 2021</small>
      </footer>
    </div>
  );
}
