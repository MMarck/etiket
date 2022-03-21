
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div id="LoginBox">
        <form id="LoginForm">
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

            <br/>
            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText" type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <br/>
            <Link to="/dashboard">
              <button>Iniciar sesión</button>
            </Link>

        </form>
        
        <br/>
        <Link to="/ResetPassword">
          <button>¿Olvidé mi contraseña?</button>
        </Link>
        
        <hr/>

        <Link to="/CreateAccount">
          <button>Crear Usuario</button>
        </Link>  

        <div className='signupButton google'>
          <span className="icon"></span>
          <span>Inicia sesion con Google</span>
        </div> 

        <div className='signupButton facebook'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div>

        <hr/>

        <span>© Copyright Solinal 2021</span>

    </div>
  )
}

export default LoginForm