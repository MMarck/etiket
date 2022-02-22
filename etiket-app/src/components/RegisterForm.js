import Button from "./Button"

const RegisterForm = () => {
  return (
    <div>
        <form id="loginform">
            <input className="inputText" type="text" name="correo" placeholder="Correo"/>
            <input className="inputText" type="password" name="contra" placeholder="Contraseña"/>
            <input className="inputText" type="password" name="confContra" placeholder="Confirmar contraseña"/>
            <Button text="CREAR CUENTA" />
        </form>
    </div>
  )
}

export default RegisterForm