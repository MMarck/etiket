import Button from "./Button"

const LoginForm = () => {
  return (
    <div>
        <form id="loginform">
            <input className="inputText" type="text" name="correo" placeholder="Correo"/>
            <input className="inputText" type="password" name="contra" placeholder="Contraseña"/>
            <Button text="INICIAR SESIÓN" />
        </form>
    </div>
  )
}

export default LoginForm