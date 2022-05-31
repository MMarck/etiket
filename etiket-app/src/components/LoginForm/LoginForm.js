import axios from "axios";
import { backendURL } from '../../config/constants.js'
import { withRouter } from "../../tools/withRouter";
import Cookies from 'js-cookie';
import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";

/**
 * Formulario de inicio de sesion 
 */
const LoginForm = () => {

  const navigate  = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCookies=(accessToken, refreshToken)=> {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }

  function login(e){
    e.preventDefault();
    const jsonData={
      email: email,
      password:password
    }
    const axiosLogin=axios.create()
    axiosLogin.post(backendURL+"UsersDB/login",jsonData)
    .then((response)=>{
      handleCookies(response.data.accessToken, response.data.refreshToken)
      navigate("/")
    })
    .catch((error)=>{
      if (error.response){
        alert(error.response.data.error.message)
      } else if (error.request){
        console.log(error.request);
      } else {
        console.log("Error", error)
      }
    })
  }

  return (
    <div className="d-flex flex-column w-50 small">
        
        <span id="avisoDeIngreso"><b>Ingresa a Solinal</b> Etiqueta</span>
        
        <form id="LoginForm" className="w-100" onSubmit={(e)=>login(e)} >
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" value={email} id="usuario" type="text" name="correo" placeholder="Ingrese su usuario" onChange={(e)=>setEmail(e.target.value)}/>

            <br/>
            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText mb-4" value={password} type="password" id="password" name="password" placeholder="Ingrese su contraseña" onChange={(e)=>setPassword(e.target.value)}/>

            <br/>
            <button type="submit" className="ligthButton">Iniciar sesión</button>

        </form>

        <br/>       
        <Link to="/login/resetPassword" className="w-100">
          <button className="btn-dark darkButton w-100">¿Olvidé mi contraseña?</button>
        </Link>

        <hr/>

        <Link to="/login/createAccount" className="w-100">
          <button className="ligthButton w-100">Crear Usuario</button>
        </Link>

        <div className='signupButton google mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Google</span>

        </div> 

        {/* <div className='signupButton facebook mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div> */}

        <hr/>

        <small>© Copyright Solinal 2021</small>

    </div>
  )
}

export default withRouter(LoginForm)