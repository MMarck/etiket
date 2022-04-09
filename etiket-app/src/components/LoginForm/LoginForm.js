
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="d-flex flex-column w-50 small">
        
        <span id="avisoDeIngreso"><b>Ingresa a Solinal</b> Etiqueta</span>
        
        <form id="LoginForm" className="w-100">
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

            <br/>
            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText mb-4" type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <br/>
            <Link to="/">
              <button className="ligthButton">Iniciar sesión</button>
            </Link>

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

        <div className='signupButton facebook mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div>

        <hr/>

        <small>© Copyright Solinal 2021</small>

    </div>
  )
}

export default LoginForm