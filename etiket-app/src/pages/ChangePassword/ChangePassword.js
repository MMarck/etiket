/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './ChangePassword.css';

/*
 *   Vista para hacer el cambio de contraseña
 */
export default function ChangePassword() {
  const passValues = {
    password: "",
    newPassword: "",
  };

  
  const [visibility, setVisibility] = useState(false);
  const [newVisibility, setNewVisibility] = useState(false);

  
  const onInputPassword = () => {
    setVisibility(prevState => !prevState);
  }

  const onInputNewPassword = () => {
    setNewVisibility(prevState => !prevState);
  }


  return (
    <div className="columnContainer w-50">
      <h4>
        <b>Introduzca su nueva contraseña</b>
      </h4>
      <br />

      <div className="rounded-square mt-5 w-75" style={{ margin: "0px auto" }}>
        <form className="w-100" >
          <label htmlFor="password">Nueva contraseña</label>
          <br />
          <input
            className="inputText ligth-input mb-4 w-100"
            id="password"
            type={
              visibility ? "text":"password"
            }
            name="password"
          />
          <i className='btn-visibility' onClick={ onInputPassword }> 
              { visibility? <AiOutlineEyeInvisible />:
                  <AiOutlineEye/>
              }
          </i>
          
          <br />
          <label htmlFor="newPassword">Verifica la nueva contraseña</label>
          <br />
          <input
            className="inputText ligth-input mb-4 w-100"
            id="newpassword"
            type={
              newVisibility ? "text":"password"
            }
            name="newpassword"
          />
          <i className='btn-visibility' onClick={ onInputNewPassword }> 
              { newVisibility? <AiOutlineEyeInvisible />:
                  <AiOutlineEye/>
              }
          </i>
        </form>
      </div>

      
        <button
          className=" btn-secondary darkButton fw-bolder p-2 my-4"
          style={{ width: "fit-content" }}
        >
          ACTUALIZAR CONTRASEÑA
        </button>
      
    </div>
  );
}
