import Button from "./Button"
import { Link } from "react-router-dom"

const LoginForm = ({onClick}) => {
  return (
    <div id="loginbox">
        <form id="loginform">
            <input className="inputText" type="text" name="correo" placeholder="Correo"/>
            <input className="inputText" type="password" name="contra" placeholder="Contraseña"/>
            
        </form>
        <Link to="/generador">
          <Button onClick={onClick} text="INICIAR SESIÓN" />
        </Link>
    </div>
  )
}

export default LoginForm