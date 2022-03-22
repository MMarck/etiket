
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div id="LoginBox">
        <form id="LoginForm">
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

            <br/>
            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText mb-4" type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <br/>
            <Link to="/dashboard">
              <button className="ligthButton">Iniciar sesión</button>
            </Link>

        </form>
    </div>
  )
}

export default LoginForm